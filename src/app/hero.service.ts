import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Hero } from "./hero/hero";
import { HEROS } from "./hero/mock-heros";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeros(): Observable<Hero[]> {
    this.messageService.add("Fetching all the heros!");
    return of(HEROS);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero ${id}`);
    return of(HEROS.find(hero => hero.id === id));
  }
}
