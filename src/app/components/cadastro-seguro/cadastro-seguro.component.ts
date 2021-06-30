import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Seguro } from 'src/app/models/Seguro';
import { MarcaCarro } from 'src/app/models/MarcaCarro';
import { Observable } from 'rxjs';
import { MarcaCarroService } from 'src/app/services/marca-carro.service';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-cadastro-seguro',
  templateUrl: './cadastro-seguro.component.html',
  styleUrls: ['./cadastro-seguro.component.css']
})
export class CadastroSeguroComponent implements OnInit {

  public seguro = new Seguro();
  public marcasCarro$: Observable<MarcaCarro[]> | undefined;

  public sub: PushSubscription | undefined;

  readonly VAPID_PUBLIC_KEY = 'BDFrBHaiWGxRJWP6uiGrZAyyscbY0HOz863iUWobn7uXwAIqohygEmhJxdHH6OO9sQRFJr0na1WVst_YmwIzb1E'

  constructor(
    private marcaCarroService: MarcaCarroService,
    private swPush: SwPush,
    private seguroService: SegurosService
  ) { }

  ngOnInit(): void {
    this.marcasCarro$ = this.marcaCarroService.getMarcas();
  }

  adicionar() {
    if (this.seguro.placaCarro !== undefined) {
      this.seguro.id = this.seguro.placaCarro;
      this.seguroService.salvar(this.seguro);
    }
  }

  enviarNotificacao() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {

        this.sub = sub;


        console.log("Notification Subscription: ", sub);

        this.seguroService.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err => console.log('Could not send subscription object to server, reason: ', err)
        );

      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
