import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiKey = "RGAPI-468d3b15-cf03-4c74-856c-fc2978cb8bf6";
  

  constructor(private http:HttpClient){ }

  getChams()
  {
    return this.http.get("/json/10.22.1/data/tr_TR/champion.json");
  }
  getCham(ChamName:String)
  {
    return this.http.get("/json10.22.1/data/tr_TR/champion/"+ChamName+".json");
  }
  getChamMaster(ChamId:string,SumId:string)
  {
    return this.http.get(`/api/champion-mastery/v4/champion-masteries/by-summoner/${SumId}/by-champion/${ChamId}?api_key=${this.apiKey}`);
  }
  getSummoner(summonerName:String)
  {
    return this.http.get(`api/summoner/v4/summoners/by-name/${summonerName}?api_key=${this.apiKey}`);
  }
  getRank(summonerId:String)
  {
    return this.http.get(`api/league/v4/entries/by-summoner/${summonerId}?api_key=${this.apiKey}`);
  }
  getMatch(id:String)
  {
    return this.http.get(`api/spectator/v4/active-games/by-summoner/${id}?api_key=${this.apiKey}`);
  }

}
