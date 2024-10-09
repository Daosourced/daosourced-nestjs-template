import * as request from "supertest";
import { AppHandles, e2eBootstrap } from "./e2e-bootstrap.util";

let appHandles: AppHandles;

describe("HealthCheck", () => {
  beforeAll(async () => {
    appHandles = await e2eBootstrap();
  });

  afterAll(async () => {
    // Stop AsyncCollector polling if it is used (e.g. as dependency of FirebaseService)
    // await AsyncCollector.stop();
    // NOTE:Calling app.close() doesn't terminate the Node process
    // but only triggers the onModuleDestroy() and onApplicationShutdown() hooks,
    // so if there are some intervals, long-running background tasks,
    // etc. the process won't be automatically terminated.
    // await appHandles.app.close();
  });

  it("GET /health", () => {
    return request(appHandles.app.getHttpServer()).get("/health").expect(200);
  });
});
