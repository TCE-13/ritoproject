import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {

  Chams:any[];
  cham:[];
  constructor(private ApiService:ApiService) { }

  ngOnInit(): void {
    this.ApiService.getChams().subscribe(response =>{
      let Chams = [];
      Object.keys(response['data']).map((cham)=>{
        Chams.push(cham);
      });
      this.Chams = Chams;
      console.log(response['data']);
    });
  }
  
}
