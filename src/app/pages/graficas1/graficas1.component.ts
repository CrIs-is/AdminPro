import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [
  ]
})
export class Graficas1Component implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  }

  graficos:any = {
    'grafico1': {
      'labels': ['Con frijoles','Con natilla','Con tocino'],
      'data':[24,30,46],
      'type':'doughnut',
      'leyenda': 'El pan se come con'
    },
    'grafico2': {
      'labels': ['Mujeres','Hombres'],
      'data':[4500,6000],
      'type':'doughnut',
      'leyenda': 'Entrevistados'
    },
    'grafico3': {
      'labels': ['si','no'],
      'data':[95,5],
      'type':'doughnut',
      'leyenda': '¿Le gustan los frijoles?'
    },
    'grafico4': {
      'labels': ['si','no'],
      'data':[85,15],
      'type':'doughnut',
      'leyenda': '¿Le importa que le den gases?'
    },
  }
}
