import type { Message } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { Command, Events, Listener } from '@sapphire/framework';
import { resolveKey } from '@sapphire/plugin-i18next';

@ApplyOptions<Listener.Options>({ event: Events.CommandRun })
export class CommandRunListener extends Listener<typeof Events.CommandRun> {
  public async run(message: Message, command: Command) {
    this.container.logger.info(
      await resolveKey(message, 'console:command', {
        author: message.author.tag,
        cmd: command.name,
      }),
    );
  }
}
