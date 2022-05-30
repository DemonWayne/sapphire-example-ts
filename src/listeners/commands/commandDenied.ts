import type { CommandDeniedPayload, Events, UserError } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';

export class CommandDeniedListener extends Listener<typeof Events.CommandDenied> {
  public async run(error: UserError, { message, command }: CommandDeniedPayload) {
    if (Reflect.get(Object(error.context), 'silent')) return;
    if (error.identifier === 'preconditionNsfw') {
      await sendLocalized(message, { keys: 'preconditions:nsfw' });
      return;
    }
    if (error.identifier === 'preconditionCooldown') {
      const context = error.context as any;
      const timeLeft = parseInt(context.remaining, 10) / 1000;
      await sendLocalized(message, {
        keys: 'preconditions:cooldown',
        formatOptions: {
          sec: timeLeft.toFixed(1),
          cmd: command.name,
        },
      });
    }
  }
}
