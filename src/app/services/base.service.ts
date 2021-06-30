import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Inject, Injectable, Injector } from '@angular/core';
import Dexie from 'dexie';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends { id: string }> {

  private db: Dexie | undefined;
  private table!: Dexie.Table<T, any>;

  protected http: HttpClient;
  protected onlineOfflineService: OnlineOfflineService;

  constructor(
    @Inject(String) protected urlApi: string,
    @Inject(String) protected nomeTabela: string,
    protected injector: Injector
  ) {
    this.http = this.injector.get(HttpClient);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);
  }

  private iniciarIndexedDb() {
    this.db = new Dexie('db-tabelas');
    this.db.version(1).stores({
      [this.nomeTabela]: 'id'
    });
    this.table = this.db.table(this.nomeTabela);
  }

  private cadastrar(tabela: T) {
    this.http.post(this.urlApi, tabela)
      .subscribe(
        () => alert('Cadastro realizado com sucesso'),
        (err) => console.log('Erro ao cadastrar. Tente novamente')
      );
  }

  private async salvarIndexedDb(tabela: T) {
    try {
      this.iniciarIndexedDb()
      await this.table.add(tabela);
      const todostabelas: T[] = await this.table.toArray();
      console.log('Salvo no IndexedDB.');
    } catch (error) {
      console.log('Erro ao salvar no IndexedDB.', error);
    }
  }

  private async enviarIndexedDbParaApi() {
    const todosTabelas: T[] = await this.table.toArray();

    for (const tabela of todosTabelas) {
      this.cadastrar(tabela);
      await this.table.delete(tabela.id);
      console.log(`Item com id ${tabela.id} foi excluido IndexedDB.`);
    }
  }

  public salvar(tabela: T) {
    if (this.onlineOfflineService.isOnline) {
      this.cadastrar(tabela);
    } else {
      this.salvarIndexedDb(tabela)
    }
  }

  listar(): Observable<T[]> {
    return this.http.get<T[]>(this.urlApi);
  }

  ouvirStatusConexao() {
    this.onlineOfflineService.statusConexao
      .subscribe(online => {
        if (online) {
          this.enviarIndexedDbParaApi();
        } else {
          console.log('Estou offline');
        }
      })
  }

  addPushSubscriber(sub: any) {
    return this.http.post(this.urlApi, sub);
  }

}
