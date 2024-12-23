import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { configureApp } from "./config/app.config";

const logger = new Logger("main");

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  configureApp(app);

  // Start microservices
  // Require @nestjs/microservices
  // const redisConfig = app.select(AppConfigModule).get(RedisConfig);
  // const microservice = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.REDIS,
  //   options: {
  //     host: redisConfig.host,
  //     port: redisConfig.port,
  //   },
  // });
  // await app.startAllMicroservices();

  await app.listen(3000);

  logger.log("App started");
  return app;
}

bootstrap();
