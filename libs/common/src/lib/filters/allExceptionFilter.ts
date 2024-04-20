import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let err = exception;
    if (typeof exception === 'object' && exception !== null && 'response' in exception) err = exception['response'];

    err = typeof err === 'string' ? { message: exception } : (err as Record<any, any>);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    response.status(err.statusCode).json({
      ...err,
      timestamp: new Date().toISOString(),
    });
  }
}
