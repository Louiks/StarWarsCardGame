import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { TranslateModule } from "@ngx-translate/core";
import { AboutPageComponent } from "./about/about-page/about-page.component";
import { SharedModule } from "../shared/shared.module";
import { HowToPageComponent } from "./how-to/how-to-page/how-to-page.component";


@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    HowToPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule
  ]
})
export class HomeModule {
}
