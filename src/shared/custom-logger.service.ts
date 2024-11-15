import { Injectable } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';

// We can extend any other base logger class
@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  /**
   * Write a 'log' level log.
   */
  log(message: string, context?: any): void {
    super.log(message, context);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: string, context?: any): void {
    super.fatal(message, context);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: string, context?: any): void {
    super.error(message, context);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: string, context?: any): void {
    super.warn(message, context);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: string, context?: any): void {
    super.debug(message, context);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: string, context?: any): void {
    super.verbose(message, context);
  }
}
