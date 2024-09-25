import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page/game-page.component';
import { GameplayRoutingModule } from "./gameplay-routing.module";
import { PeopleService } from "./services/people.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChampionCardComponent } from './components/champion-card/champion-card.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "../shared/shared.module";
import { PointCounterComponent } from './components/point-counter/point-counter.component';
import { WinnerPosterComponent } from './components/winner-poster/winner-poster.component';
import { GameDriverService } from "./services/game-driver.service";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';

@NgModule({
  declarations: [
    GamePageComponent,
    ChampionCardComponent,
    PointCounterComponent,
    WinnerPosterComponent,
    SettingsMenuComponent,
  ],
  imports: [
    CommonModule,
    GameplayRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
    TranslateModule,
    MatIconModule,
  ],
  providers: [
    PeopleService,
    HttpClient,
    GameDriverService
  ]
})
export class GameplayModule {
}
