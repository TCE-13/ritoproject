import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getSummoner(summonerName:HTMLInputElement)
  {
    console.log(summonerName.value);
    this.router.navigate(['summoner',summonerName.value]);
    summonerName.value = "";
  }
}
