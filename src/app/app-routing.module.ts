import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./home/home-page/home-page.component";
import { AboutPageComponent } from "./home/about/about-page/about-page.component";
import { HowToPageComponent } from "./home/how-to/how-to-page/how-to-page.component";

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'how-to-play', component: HowToPageComponent },
  {
    path: 'game',
    loadChildren: () => import('./gameplay/gameplay.module').then(m => m.GameplayModule)
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
