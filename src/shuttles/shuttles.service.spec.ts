import { Test, TestingModule } from '@nestjs/testing';
import { ShuttlesService } from './shuttles.service';

describe('ShuttlesService', () => {
  let service: ShuttlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShuttlesService],
    }).compile();

    service = module.get<ShuttlesService>(ShuttlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
