import { Injectable, Injector } from '@angular/core';
import { Seguro } from '../models/Seguro';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class SegurosService extends BaseService<Seguro> {

  constructor(
    protected injector: Injector
  ) {
   
    super(`https://cadastro-b-pwa.herokuapp.com/api/seguros`, 'Seguro', injector);
  }

}