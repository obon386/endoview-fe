/* eslint-disable @typescript-eslint/dot-notation */
import {TestBed} from '@angular/core/testing';

import {first} from 'rxjs/operators';
import {LoadingService} from './loading.service';

describe('LoadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', async () => {
    const service: LoadingService = TestBed.get(LoadingService);
    expect(service).toBeTruthy();

    expect(await service.isLoading$.pipe(first()).toPromise()).toBeFalsy();
  });

  it('should NOT count negative', async () => {
    const service: LoadingService = TestBed.get(LoadingService);

    expect(await service.isLoading$.pipe(first()).toPromise()).toBeFalsy();
    expect(service['calls']).toBe(0);

    // Calls stay 0 and will not get negative
    service.endCall();
    service.endCall();
    service.endCall();
    service.endCall();
    expect(service['calls']).toBe(0);
    expect(await service.isLoading$.pipe(first()).toPromise()).toBeFalsy();

    service.startCall();
    expect(service['calls']).toBe(1);
    expect(await service.isLoading$.pipe(first()).toPromise()).toBeTruthy();
  });

  it('should count concurrent calls', async () => {
    const service: LoadingService = TestBed.get(LoadingService);

    expect(service['calls']).toBe(0);
    expect(await service.isLoading$.pipe(first()).toPromise()).toBeFalsy();

    service.startCall();
    expect(service['calls']).toBe(1);
    expect(await service.isLoading$.pipe(first()).toPromise()).toBeTruthy();

    service.startCall();
    expect(service['calls']).toBe(2);
    expect(await service.isLoading$.pipe(first()).toPromise()).toBeTruthy();

    service.endCall();
    expect(service['calls']).toBe(1);
    expect(await service.isLoading$.pipe(first()).toPromise()).toBeTruthy();

    service.endCall();
    expect(service['calls']).toBe(0);
    expect(await service.isLoading$.pipe(first()).toPromise()).toBeFalsy();
  });
});
