import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {UserSittingdataDataservice} from "./user-sittingdata-dataservice";


@Component({
  selector: 'app-user-panel-content',
  standalone: true,
  imports: [],
  templateUrl: './user-panel-content.component.html',
  styleUrl: './user-panel-content.component.css'
})
export class UserPanelContentComponent implements OnInit{
  constructor(private dataService:UserSittingdataDataservice) {
  }
  ngOnInit(): void {
    this.getLastDays();


  }


  createChart(){
    var myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.days,
        datasets: [
          {
            label: 'Minutes',
            data: this.minutes,
            type: 'bar', // Ovo postavlja tip na bar za glavni set podataka
            borderWidth: 2,
            order: 2, // Redosled crtanja za barove
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Boja ispune barova
            borderColor: 'rgba(75, 192, 192, 1)', // Boja linija oko barova
          },
          {
            type: 'line', // Ovo postavlja tip na line za dodatni set podataka
            label: 'Minutes line',
            data: this.minutes, // Podaci za dodatni set (može biti drugačiji niz podataka ako je potrebno)
            fill: false, // Da li popuniti prostor ispod linije
            order: 1, // Redosled crtanja za liniju
            borderColor: 'rgba(255, 99, 132, 1)', // Boja linije
            tension: 0.1, // Tenzija linije (0.0 - 1.0)

          },
        ],
      },
      options: {
        plugins:{
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  lastDays:LastDaysResponse[]=[];
  minutes:number[]=[];
  days:string[]=[];
  private getLastDays() {
  this.dataService.GetLastSpecificDays(5).subscribe(x=>{
    this.lastDays=x;

    this.days=this.lastDays.map(item=>item.date.split('T')[0]);
    this.minutes=this.lastDays.map(item=>item.totalMinutes);
    console.log(this.lastDays);
    console.log(this.days);
    console.log(this.minutes);
    this.createChart();

  })
  }
}

export interface LastDaysResponse{
  date:string,
  totalMinutes:number
}
