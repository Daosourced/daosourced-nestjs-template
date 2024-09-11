import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configureApp } from "./config/app.config";

const logger = new Logger("main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureApp(app);

  // Start microservices
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
