import { Controller, Get } from "@nestjs/common";
import type { HealthCheckResult } from "@nestjs/terminus";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";

@Controller("health")
export class HealthCheckController {
  constructor(private healthCheckSvc: HealthCheckService) {}

  @Get()
  @HealthCheck()
  async healthCheck(): Promise<HealthCheckResult> {
    return this.healthCheckSvc.check([]);
  }
}
