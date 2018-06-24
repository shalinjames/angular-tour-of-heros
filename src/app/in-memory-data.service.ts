import { InMemoryDbService } from "angular-in-memory-web-api";

import { HEROS } from "./hero/mock-heros";
import { Hero } from "./hero/hero";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: Hero[] = HEROS;
    return { heroes };
  }
}
