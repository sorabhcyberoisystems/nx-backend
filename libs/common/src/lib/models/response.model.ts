import { HttpStatus } from '@nestjs/common';

export class ResponseModel<T = unknown> {
  totalCount?: number;
  success?: boolean;
  message?: string;
  data?: T;
  error?: unknown;
  status?: HttpStatus;

  constructor(
    data: T,
    { totalCount, success, message, error, status }: ResponseModel<unknown> = {
      status: HttpStatus.OK,
      success: true,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pipe?: (data: T) => any,
  ) {
    this.data = pipe ? pipe(data) : data;
    this.totalCount = totalCount;
    this.success = success;
    this.message = message;
    this.error = error;
    this.status = status;
  }
}
