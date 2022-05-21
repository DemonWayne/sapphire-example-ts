import type { ArgumentContext } from '@sapphire/framework';
import { Argument } from '@sapphire/framework';
import { Duration } from '@sapphire/time-utilities';

export = class duration extends Argument {
  public run(parameter: string, context: ArgumentContext) {
    const date = new Duration(parameter).fromNow;
    if (!isNaN(date.getTime()) && date.getTime() > Date.now()) return this.ok(date);
    return this.error({ parameter, identifier: 'StringNotDuration', context });
  }
};

declare module '@sapphire/framework' {
  interface ArgType {
    duration: string;
  }
}
