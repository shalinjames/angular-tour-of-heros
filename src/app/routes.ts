import { Route } from "@angular/router";

import { HeroComponent } from "./hero/hero.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

interface CustomRoute extends Route {
  isNav?: boolean;
}

type Routes = Array<CustomRoute>;

export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "heros", component: HeroComponent, isNav: true },
  { path: "dashboard", component: DashboardComponent, isNav: true },
  { path: "detail/:id", component: HeroDetailComponent }
];
