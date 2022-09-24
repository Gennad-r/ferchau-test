import { UnicIdService } from './unic-id.service';

describe('UnicIdService', () => {
  let service: UnicIdService;

  beforeEach(() => {
    service = new UnicIdService();
    console.log('service', service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUnic', () => {
    it('should create unic id', () => {
      const length = 1000;
      const unicsSet = new Set(
        Array.from(new Array(length)).map(() => {
          return service.getUnic('test-');
        })
      );
      expect(unicsSet.size).toBe(length);
    });
  });
});
