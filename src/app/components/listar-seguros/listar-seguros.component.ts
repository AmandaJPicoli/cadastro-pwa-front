import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro } from 'src/app/models/Seguro';
import { SegurosService } from 'src/app/services/seguros.service';

@Component({
  selector: 'app-listar-seguros',
  templateUrl: './listar-seguros.component.html',
  styleUrls: ['./listar-seguros.component.css']
})
export class ListarSegurosComponent implements OnInit {

  public seguros$: Observable<Seguro[]> | undefined;

  constructor(
    private seguroService: SegurosService
  ) { }

  ngOnInit(): void {
    this.seguros$ = this.seguroService.listar();
  }

}
