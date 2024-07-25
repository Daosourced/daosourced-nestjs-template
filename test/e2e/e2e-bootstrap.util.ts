import { INestApplication, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { APP_MODULE_METADATA } from "../../src/app.module";
import { configureApp } from "../../src/main";

const testLogger = new Logger("test");

export type AppHandles = {
  moduleFixture: TestingModule;
  app: INestApplication;
};

export async function e2eBootstrap(): Promise<AppHandles> {
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

  await app.init(); // Required in tests

  return { moduleFixture, app };
}
