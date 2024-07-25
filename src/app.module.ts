import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ControllerModule } from "./controller/controller.module";

const NODE_ENV = process.env.NODE_ENV;

const globalConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  // If a variable is found in multiple files, the first one takes precedence.
  envFilePath: [
    // .env is always loaded first, so if a var is defined in .env, it cannot be overwritten ?
    NODE_ENV ? `.env.${NODE_ENV}.local` : "",
    NODE_ENV ? `.env.${NODE_ENV}` : "",
    ".env.default",
  ],
  cache: true,
});

export const APP_MODULE_METADATA = {
  imports: [globalConfigModule, ControllerModule],
  controllers: [],
  providers: [],
};

@Module(APP_MODULE_METADATA)
export class AppModule {}
