import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from '../../../src/module/hello/hello.controller';
import { HelloService } from '../../../src/module/hello/hello.service';

describe(HelloController.name, () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(HelloController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
