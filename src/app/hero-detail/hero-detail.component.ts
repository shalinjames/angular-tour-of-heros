import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HeroService } from "../hero.service";
import { Hero } from "../hero/hero";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  getHero() {
    const selectedId = +this.activeRoute.snapshot.paramMap.get("id");
    this.heroService.getHero(selectedId).subscribe(hero => (this.hero = hero));
  }
  ngOnInit() {
    this.getHero();
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(_ => this.goBack());
  }
}
