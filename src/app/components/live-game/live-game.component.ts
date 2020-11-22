import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-live-game',
  templateUrl: './live-game.component.html',
  styleUrls: ['./live-game.component.css']
})
export class LiveGameComponent implements OnInit {

  Champions:any[];

  summonerName:string;

  summoner:any = [{'profileIconId':'685'}];
  rank:any = [{'tier':'UNRANKED','rank':''},{'tier':'UNRANKED','rank':''}];
  macth:any=
  {
    'blue':[],
    'red':[],
    'blueBan':[],
    'redBan':[]
  };

  summonerError:boolean;
  matchError:boolean;

  

  constructor(private apiService:ApiService,
              private route : ActivatedRoute
             ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      let name = params.get('name');
      this.summonerName = name;
      this.getSum();
      
    });
    this.apiService.getChams().subscribe(response =>{
      let Chams = [];
      Object.keys(response['data']).map((cham)=>{
        Chams.push(response['data'][cham]);
      });
      this.Champions = Chams;
    });
    
  }
  getSum()
  {
    this.apiService.getSummoner(this.summonerName).toPromise().then(res=>{
      this.summoner = res;

      this.getRank();
      this.getMacth();
      
      this.summonerError = false;
    }).catch(err =>{
      this.summonerError = true;
    });
  }
  getRank()
  {
    this.apiService.getRank(this.summoner['id']).subscribe(res => {
      if(res != "")
      {
        if(res[0] && res[1] != null)
        {
          this.rank[1] = res[1];
          this.rank[0] = res[0];
        }
        else if(res[1] == null)
        {
          if(res[0]['queueType'] == "RANKED_SOLO_5x5")
          {
            this.rank[1] = res[0];
            this.rank[0] = {'tier':'UNRANKED','rank':''};
          }
          else
          {
            this.rank[0] = res[0];
            this.rank[1] = {'tier':'UNRANKED','rank':''};
          }
        };     
      }
      else
      {
        this.rank = [{'tier':'UNRANKED','rank':''},{'tier':'UNRANKED','rank':''}];
      }
      console.log(res);
      
    });
  }
  
  getChams(Id):any 
  {
    let cham:any;
    this.Champions.forEach(item => {
      if(item['key'] == Id)
      {
        cham = item;
      }
    });
    return cham;
  }

  getMacth()
  {
    this.apiService.getMatch(this.summoner['id']).subscribe(res => {
      console.log(res);

      this.macth = {
        'blue':[],
        'red':[],
        'blueBan':[],
        'redBan':[]
      };

      res['participants'].forEach(element =>{
        if(element['teamId'] == 100)
        { 

          this.apiService.getRank(element['summonerId']).subscribe(res =>{
            this.apiService.getChamMaster(element['championId'],element['summonerId']).subscribe(master =>{
              if(res != "")
              {
                if(res[1] && res[0] != null)
                {
                  this.macth.blue.push({'summonerName':element['summonerName'],'summonerId':element['summonerId'],'champion':this.getChams(element['championId']),'rank':{0:res[1],1:res[0]},'master':master});
                }
                else if(res[1] == null )
                {
                  this.macth.blue.push({'summonerName':element['summonerName'],'summonerId':element['summonerId'],'champion':this.getChams(element['championId']),'rank':{0:res[0],1:{'tier':'UNRANKED','rank':'','leaguePoints':'0','wins':'0','losses':'0'}},'master':master});
                }
              }
              else
              {
                this.macth.blue.push({'summonerName':element['summonerName'],'summonerId':element['summonerId'],'champion':this.getChams(element['championId']),'rank':{0:{'tier':'UNRANKED','rank':'','leaguePoints':'0','wins':'0','losses':'0'},1:{'tier':'UNRANKED','rank':'','leaguePoints':'0','wins':'0','losses':'0'}},'master':master});
              }
            });
          });            
          
        }
        else
        {

          this.apiService.getRank(element['summonerId']).subscribe(res =>{
            this.apiService.getChamMaster(element['championId'],element['summonerId']).subscribe(master =>{
              if(res != "")
              {
                if(res[1] && res[0] != null)
                {
                  this.macth.red.push({'summonerName':element['summonerName'],'summonerId':element['summonerId'],'champion':this.getChams(element['championId']),'rank':{0:res[1],1:res[0]},'master':master});
                }
                else if(res[1] == null )
                {
                  this.macth.red.push({'summonerName':element['summonerName'],'summonerId':element['summonerId'],'champion':this.getChams(element['championId']),'rank':{0:res[0],1:{'tier':'UNRANKED','rank':'','leaguePoints':'0','wins':'0','losses':'0'}},'master':master});
                }
              }
              else
              {
                this.macth.red.push({'summonerName':element['summonerName'],'summonerId':element['summonerId'],'champion':this.getChams(element['championId']),'rank':{0:{'tier':'UNRANKED','rank':'','leaguePoints':'0','wins':'0','losses':'0'},1:{'tier':'UNRANKED','rank':'','leaguePoints':'0','wins':'0','losses':'0'}},'master':master});
              }
            });
          }); 

        }
      });
      res['bannedChampions'].forEach(element => {
        if(element['teamId'] == 100)
        {
          if(element['championId'] != -1)
          {
            this.macth.blueBan.push({'pick':element['pickTurn'],'champion':this.getChams(element['championId'])});
          }
          
        }
        else
        {
          if(element['championId'] != -1)
          {
            this.macth.redBan.push({'pick':element['pickTurn'],'champion':this.getChams(element['championId'])});
          }
        }
      });
      console.log(this.macth);

      this.matchError = false;
    },err => this.matchError = true);
  }

  


}
