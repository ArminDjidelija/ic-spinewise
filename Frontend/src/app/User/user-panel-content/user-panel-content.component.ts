import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {UserSittingdataDataservice} from "./user-sittingdata-dataservice";
import {NgClass, NgIf} from "@angular/common";
import {interval, switchMap} from "rxjs";


@Component({
  selector: 'app-user-panel-content',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './user-panel-content.component.html',
  styleUrl: './user-panel-content.component.css'
})
export class UserPanelContentComponent implements OnInit{
  constructor(private dataService:UserSittingdataDataservice) {
  }
  ngOnInit(): void {
    this.getLastDays();
  this.getGoodBadRatio();
this.getWarning();

setInterval(()=>{this.getWarning();}, this.intervalPause*1000);
  }

intervalPause=20;
  createChart1(){
    var myChart = new Chart('vrijeme', {
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
          title:{
            display:true,
            text:'Sitting time per day'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  createChart2(){
    var myChart = new Chart('goodbad', {
      type: 'bar',
      data: {
        labels: this.daysratio,
        datasets: [
          {
            label: 'Good posture %',
            data: this.goodpercentages,
            type: 'bar', // Ovo postavlja tip na bar za glavni set podataka
            borderWidth: 2,
            order: 2, // Redosled crtanja za barove
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Boja ispune barova
            borderColor: 'rgba(75, 192, 192, 1)', // Boja linija oko barova
          },
          {
            label: 'Bad posture %',
            data: this.badpercentages,
            type: 'bar', // Ovo postavlja tip na bar za glavni set podataka
            borderWidth: 2,
            order: 2, // Redosled crtanja za barove
            backgroundColor: 'rgba(255, 5, 5, 0.2)', // Boja ispune barova
            borderColor: 'rgba(175, 100, 192, 1)', // Boja linija oko barova
          },
          // {
          //   type: 'line', // Ovo postavlja tip na line za dodatni set podataka
          //   label: 'Good posture line',
          //   data: this.goodpercentages, // Podaci za dodatni set (može biti drugačiji niz podataka ako je potrebno)
          //   fill: false, // Da li popuniti prostor ispod linije
          //   order: 1, // Redosled crtanja za liniju
          //   borderColor: 'rgba(255, 99, 132, 1)', // Boja linije
          //   tension: 0.1, // Tenzija linije (0.0 - 1.0)
          // },
          // {
          //   type: 'line', // Ovo postavlja tip na line za dodatni set podataka
          //   label: 'Bad posture line',
          //   data: this.goodpercentages, // Podaci za dodatni set (može biti drugačiji niz podataka ako je potrebno)
          //   fill: false, // Da li popuniti prostor ispod linije
          //   order: 1, // Redosled crtanja za liniju
          //   borderColor: 'rgba(255, 99, 132, 1)', // Boja linije
          //   tension: 0.1, // Tenzija linije (0.0 - 1.0)
          // },
        ],
      },
      options: {
        plugins:{
          title:{
            display:true,
            text:'Good and bad posture ratio per day'
          }
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
    this.createChart1();

  })
  }

  ratios:GoodBadRatioResponse[]=[];
  daysratio:string[]=[];
  goodpercentages:number[]=[];
  badpercentages:number[]=[];

  private getGoodBadRatio(){
    this.dataService.GetGoodBadRatioData(5).subscribe(x=>{
      this.ratios=x;

      this.daysratio=this.ratios.map(item=>item.date.split('T')[0]);
      this.goodpercentages=this.ratios.map(item=>item.ratioGood);
      this.badpercentages=this.ratios.map(item=>item.ratioBad);
      this.createChart2();
    })
  }

  warningobj:WarningInfo={
    badCount:0,
    badCount5:0,
    badGoodRatio:0,
    badGoodRatio5:0,
    goodBadRatio:0,
    goodBadRatio5:0,
    goodCount:0,
    goodCount5:0,
  }
  warningShow=false;

  procenatLast5=0;


  private getWarning(){
    this.dataService.GetWarning().subscribe(x=>{
    this.warningobj=x;
    if(this.warningobj.badGoodRatio5>70){
      this.procenatLast5=this.warningobj.badGoodRatio5;
      this.warningShow=true;
      this.activateWarning();
    }
    else{
      this.procenatLast5=0;
      this.warningShow=false;

      this.deactivateWarning();
    }
    })
  }
counter=0;
  isred=false;
  iswhite=false;
  async activateWarning(){

    await this.executeWithDelay(1000, true);
    await this.executeWithDelay(1000, false);
    await this.executeWithDelay(1000, true);
    await this.executeWithDelay(1000, false);
    await this.executeWithDelay(1000, true);
    await this.executeWithDelay(1000, false);
    this.isred=false;
    this.iswhite=true;
    this.warningShow=false;
  }
  deactivateWarning(){

  }

  executeWithDelay(delay:number, isr:boolean,):Promise<void>{
    return new Promise(resolve => {
      setTimeout(()=>{
        this.isred=isr;
        console.log(this.isred);
        this.iswhite=!isr;
        resolve();
      }, delay);
    })
  }


}

export interface LastDaysResponse{
  date:string,
  totalMinutes:number
}

export interface GoodBadRatioResponse {
  date: string
  countGood: number
  countBad: number
  ratioGood: number
  ratioBad: number
}
export interface WarningInfo {
  badCount: number
  goodCount: number
  goodBadRatio: number
  badGoodRatio: number
  badCount5: number
  goodCount5: number
  goodBadRatio5: number
  badGoodRatio5: number
}
