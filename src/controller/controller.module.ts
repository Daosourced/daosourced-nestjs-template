import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthCheckController } from "./health-check.controller";

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [],
  exports: [],
})
export class ControllerModule {}
