import { INestApplication, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { APP_MODULE_METADATA } from "../../src/app.module";
import { configureApp } from "../../src/config/app.config";

export const testLogger = new Logger("TestLogger");

export type AppHandles = {
  moduleFixture: TestingModule;
  app: INestApplication;
};

/**
 * Modify this function to match with bootstrap of the app
 * @returns AppHandles
 */
export async function e2eBootstrap(): Promise<AppHandles> {
  // Call this function if typeorm-transactional-cls-hooked is used
  // initializeTransactionalContext();

  let moduleFixture = await Test.createTestingModule(APP_MODULE_METADATA)
    .setLogger(testLogger) // Set this if we want app log is outputted with Jest log
    .compile();

  let app = moduleFixture.createNestApplication();

  configureApp(app);

  // Start microservices
  // const redisConfig = moduleFixture.select(AppConfigModule).get(RedisConfig);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.REDIS,
  //   options: {
  //     host: redisConfig.host,
  //     port: redisConfig.port,
  //   },
  // });
  // await app.startAllMicroservices();

  // Necessary to call this function to bootstrap e2e tests
  await app.init();

  return { moduleFixture, app };
}
