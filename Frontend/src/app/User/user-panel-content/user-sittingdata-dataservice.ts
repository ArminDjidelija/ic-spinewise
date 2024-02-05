import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MyConfig} from "../../MyConfig";

@Injectable({providedIn:'root'})
export class UserSittingdataDataservice{
  constructor(private http:HttpClient) {
  }

  GetLastDay(){
    var url=MyConfig.api_address+"/logsdata/getlastdayminutes";
    return this.http.get(url);
  }

  GetLastSpecificDays(x:any){
    var url=MyConfig.api_address+"/lastndays/get?request="+x.toString();
    return this.http.get<LastDaysResponse[]>(url);
  }
}

export interface LastDaysResponse{
  date:string,
  totalMinutes:number
}
