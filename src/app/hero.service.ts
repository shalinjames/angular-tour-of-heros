import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Hero } from "./hero/hero";
import { HEROS } from "./hero/mock-heros";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient
  ) {}
  private heroesUrl = "api/heroes";
  getHeros(): Observable<Hero[]> {
    this.messageService.add("Fetching all the heros!");
    return this.httpClient.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero ${id}`);
    return of(HEROS.find(hero => hero.id === id));
  }
}
