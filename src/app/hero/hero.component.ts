import { Component, OnInit } from "@angular/core";

import { Hero } from "./hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.css"]
})
export class HeroComponent implements OnInit {
  selectedHero: Hero;
  heros: Hero[];
  constructor(private heroService: HeroService) {}

  getHeros(): void {
    this.heroService.getHeros().subscribe(heros => (this.heros = heros));
  }
  add(name: string): void {
    if (name !== "") {
      this.heroService
        .addHero({ name } as Hero)
        .subscribe(hero => this.heros.push(hero));
    }
  }
  ngOnInit() {
    this.getHeros();
  }
}
