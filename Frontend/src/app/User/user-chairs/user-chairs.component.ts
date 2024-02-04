import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Chair, DataServiceChairs} from "./data-service-chairs";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-chairs',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf,
    FormsModule
  ],
  templateUrl: './user-chairs.component.html',
  styleUrl: './user-chairs.component.css'
})
export class UserChairsComponent implements OnInit{
  constructor(private dataService:DataServiceChairs) {
  }
  ngOnInit(): void {
    this.loadChairs();
  }
  stolica:Chair={
    serialNumber:"",
    dateOfCreating:"",
    chairModelName:""
  };
  serialNumber="";
  loadChairs(){
    this.dataService.GetChairs().subscribe(x=>{
      this.stolica=x;
      console.log(this.stolica);
    })
  }

  setUserChair(){
    this.dataService.SetUserChair(this.serialNumber).subscribe(x=>{
      this.loadChairs();
    })
  }

}
