import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';
import type { Message } from 'discord.js';
const { sendArgsError } = require('#utils/index');

@ApplyOptions<Command.Options>({ description: 'Test command', preconditions: ['devOnly'] })
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    const Arguments = [{ name: 'string', type: 'string', required: true }];
    const arg = await args.pick('string').catch(() => sendArgsError(message, Arguments));
    if (!arg) return;

    sendLocalized(message, { keys: 'test:success', formatOptions: { arg: arg } });
  }
}
