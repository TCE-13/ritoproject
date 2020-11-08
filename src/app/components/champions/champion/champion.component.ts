import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.css']
})
export class ChampionComponent implements OnInit {
  a:any[any];
  selectedCham;
  Cham:any[any];
  constructor(private route:ActivatedRoute,private ApiService:ApiService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
          let name = params.get('name');
          this.selectedCham = name;
          this.getCham(this.selectedCham)
      });
    ;
      
  }

  getCham(chamName:String)
  {
    this.ApiService.getCham(chamName).subscribe(res=>{
      this.Cham = res['data'][`${chamName}`];
      
    });
  }
}
