import { Module } from '@nestjs/common';
import { HelloController } from './module/hello/hello.controller';
import { HelloService } from './module/hello/hello.service';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class AppModule {}
