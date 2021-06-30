import { Injectable, Injector } from '@angular/core';
import { Notificacao } from 'src/app/models/Notificacao';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService<Notificacao> {

  constructor(
    protected injector: Injector
  ) {
   
    super(`https://cadastro-b-pwa.herokuapp.com/api/notifications`, 'Notification', injector);
  }

}