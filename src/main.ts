import {
  BadRequestFilter,
  DefaultExceptionFilter,
  UnauthorizedExceptionFilter,
  UnprocessableEntityExceptionFilter,
} from "@daosourced/nestjs-common";
import {
  BadRequestException,
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  Logger,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import * as compression from "compression";
import helmet from "helmet";
import * as morgan from "morgan";
import { AppModule } from "./app.module";

const logger = new Logger("main");

export function configureApp(app: INestApplication) {
  app.enableCors();

  app.use(helmet());
  app.use(compression());
  app.use(
    morgan("combined", {
      skip: function (req, res) {
        // Skip logging health check
        return req.method === "GET" && req.url === "/health";
      },
    }),
  );
  // app.enableVersioning();

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * If set to true validator will strip validated object of any properties that do not have
       * any decorators.
       */
      whitelist: false,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  app.useGlobalFilters(
    new DefaultExceptionFilter(),
    new BadRequestFilter(),
    new UnprocessableEntityExceptionFilter(),
    new UnauthorizedExceptionFilter(app.getHttpAdapter()),
  );
}

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
