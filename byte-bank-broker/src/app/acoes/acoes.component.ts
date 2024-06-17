import { AcoesService } from './acoes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(
    tap(() => {
      console.log('Fluxo inicial');
    })
  );
  private _filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    tap(() => {
      console.log('Fluxo do Filtro');
    }),
    tap(console.log),
    filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );
  public get filtroPeloInput$() {
    return this._filtroPeloInput$;
  }
  public set filtroPeloInput$(value) {
    this._filtroPeloInput$ = value;
  }

  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);
  constructor(private acoesService: AcoesService) { }
}
