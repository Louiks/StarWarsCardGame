import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { BackgroundStarsComponent } from './components/background-stars/background-stars.component';
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { TextCardComponent } from './components/text-card/text-card.component';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    TopBarComponent,
    BackgroundStarsComponent,
    TextCardComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
  ],
  exports: [
    TopBarComponent,
    BackgroundStarsComponent,
    TextCardComponent
  ]
})
export class SharedModule {
}
