import { Test, TestingModule } from '@nestjs/testing';
import { ShuttlesController } from './shuttles.controller';
import { ShuttlesService } from './shuttles.service';

describe('ShuttlesController', () => {
  let controller: ShuttlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShuttlesController],
      providers: [ShuttlesService],
    }).compile();

    controller = module.get<ShuttlesController>(ShuttlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
