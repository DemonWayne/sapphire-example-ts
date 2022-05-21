import { Precondition } from '@sapphire/framework';
import { resolveKey } from '@sapphire/plugin-i18next';
import type { Message } from 'discord.js';

const DEVS = process.env.DEVS || [''];

export class devOnly extends Precondition {
  public async run(message: Message) {
    return DEVS.includes(message.author.id)
      ? this.ok()
      : this.error({ message: await resolveKey(message, 'preconditions:dev') });
  }
}

declare module '@sapphire/framework' {
  interface Preconditions {
    devOnly: never;
  }
}
