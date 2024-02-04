import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MyConfig} from "../../MyConfig";

@Injectable({providedIn:'root'})
export class DataServiceChairs{
  constructor(private http:HttpClient) {
  }

  GetChairs(){
    var url=MyConfig.api_address+"/chair/getbyuser";
    return this.http.get<Chair>(url);
  }

  SetUserChair(number:any){
    var url=MyConfig.api_address+"/userchair/addchair";
    let obj={
      serialNumber:number
    };
    return this.http.post(url, obj);
  }
}

export interface Chair{
  serialNumber:string,
  dateOfCreating:string,
  chairModelName:string
}
