import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: CallHandler<any>,
  ): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return pipe(tap(() => console.log(`After... ${Date.now() - now}ms`))).call(
      context,
      call$,
    );
  }
}
