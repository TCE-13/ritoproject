import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ChampionsComponent } from './components/champions/champions.component';
import { ChampionComponent } from './components/champions/champion/champion.component';
import { LiveGameComponent } from './components//live-game/live-game.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const appRouting:Routes = 
    [
        {path:"",component:HomeComponent,children:[
            {path:"summoner/:name",component:LiveGameComponent}
        ]},
        {path:"champions",component:ChampionsComponent},
        {path:'champions/:name',component:ChampionComponent},
        {path:"**",component:NotfoundComponent}
        
    ];


@NgModule({
    imports:[
        RouterModule.forRoot(appRouting)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}