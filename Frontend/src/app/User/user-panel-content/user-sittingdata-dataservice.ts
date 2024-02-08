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

  GetGoodBadRatioData(x:any){
    var url=MyConfig.api_address+"/goodbadratio/get?request="+x.toString();
    return this.http.get<GoodBadRatioResponse[]>(url);
  }
  GetWarning(){
    var url=MyConfig.api_address+"/warning/get";
    return this.http.get<WarningInfo>(url);
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

