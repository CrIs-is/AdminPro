import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType, ChartLegendItem } from 'chart.js';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html'
})
export class GraficaDonaComponent implements OnInit {

  @Input() doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  @Input() public doughnutChartType: ChartType = 'doughnut';
  public ChartLegend = true
  public pieChartLegend = true;
  constructor() { }

  ngOnInit(): void {
  }

}
