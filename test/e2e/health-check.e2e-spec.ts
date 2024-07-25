import * as request from "supertest";
import { AppHandles, e2eBootstrap } from "./e2e-bootstrap.util";

let appHandles: AppHandles;

describe("HealthCheck", () => {
  beforeAll(async () => {
    appHandles = await e2eBootstrap();
  });

  afterAll(async () => {
    // await AsyncCollector.stop();
    await appHandles.app.close();
  });

  it("GET /health", () => {
    return request(appHandles.app.getHttpServer()).get("/health").expect(200);
  });
});
