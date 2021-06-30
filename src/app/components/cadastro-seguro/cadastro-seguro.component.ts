import { Component, OnInit } from '@angular/core';
import { Seguro } from 'src/app/models/Seguro';
import { MarcaCarro } from 'src/app/models/MarcaCarro';
import { Observable } from 'rxjs';
import { MarcaCarroService } from 'src/app/services/marca-carro.service';
import { SegurosService } from 'src/app/services/seguros.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-cadastro-seguro',
  templateUrl: './cadastro-seguro.component.html',
  styleUrls: ['./cadastro-seguro.component.css']
})
export class CadastroSeguroComponent implements OnInit {

  public seguro = new Seguro();
  public marcasCarro$: Observable<MarcaCarro[]> | undefined ;

  constructor(
    private marcaCarroService: MarcaCarroService,
    private seguroService: SegurosService
  ) { }

  ngOnInit(): void {
    this.marcasCarro$ = this.marcaCarroService.getMarcas();
  }

  adicionar(){
    if( this.seguro.placaCarro !== undefined){
      this.seguro.id = this.seguro.placaCarro;
      this.seguroService.salvar(this.seguro);
    }
  }

  enviarNotificacao(){
    
  }
}
