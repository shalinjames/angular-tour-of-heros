import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

// Other imports
import { TestBed } from "@angular/core/testing";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { Hero } from "./hero/hero";
import { HeroService } from "./hero.service";

fdescribe("HeroService", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [HeroService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// HeroService method tests begin ///

  describe("#getHeros", () => {
    let expectedHeroes: Hero[];

    beforeEach(() => {
      heroService = TestBed.get(HeroService);
      expectedHeroes = [{ id: 1, name: "A" }, { id: 2, name: "B" }] as Hero[];
    });

    it("should return expected heroes (called once)", () => {
      heroService
        .getHeros()
        .subscribe(
          heroes =>
            expect(heroes).toEqual(
              expectedHeroes,
              "should return expected heroes"
            ),
          fail
        );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual("GET");

      // Respond with the mock heroes
      req.flush(expectedHeroes);
    });

    it("should be OK returning no heroes", () => {
      heroService
        .getHeros()
        .subscribe(
          heroes =>
            expect(heroes.length).toEqual(0, "should have empty heroes array"),
          fail
        );

      const req = httpTestingController.expectOne(heroService.heroesUrl);
      req.flush([]); // Respond with no heroes
    });

    // This service reports the error but finds a way to let the app keep going.
    it("should turn 404 into an empty heroes result", () => {
      heroService
        .getHeros()
        .subscribe(
          heroes =>
            expect(heroes.length).toEqual(
              0,
              "should return empty heroes array"
            ),
          fail
        );

      const req = httpTestingController.expectOne(heroService.heroesUrl);

      // respond with a 404 and the error message in the body
      const msg = "deliberate 404 error";
      req.flush(msg, { status: 404, statusText: "Not Found" });
    });

    it("should return expected heroes (called multiple times)", () => {
      heroService.getHeros().subscribe();
      heroService.getHeros().subscribe();
      heroService
        .getHeros()
        .subscribe(
          heroes =>
            expect(heroes).toEqual(
              expectedHeroes,
              "should return expected heroes"
            ),
          fail
        );

      const requests = httpTestingController.match(heroService.heroesUrl);
      expect(requests.length).toEqual(3, "calls to getHeros()");

      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([{ id: 1, name: "bob" }]);
      requests[2].flush(expectedHeroes);
    });
  });

  // TODO: test other HeroService methods
});
