import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';
import type { Message } from 'discord.js';
import { sendArgsError } from '#utils/index';
import infractions from '#models/infractions';

@ApplyOptions<Command.Options>({ description: 'Unmute command', preconditions: ['GuildOnly', 'modOnly'] })
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    const Arguments = [{ name: 'member', type: 'user', required: true }];
    const member = await args.pick('member').catch(() => sendArgsError(message, Arguments));
    if (!member) return;

    if (!member.isCommunicationDisabled()) {
      await sendLocalized(message, 'unmute:erorr_nomute');
      return;
    }

    const mutes: Array<object> = await infractions.find({
      guildId: message.guild!.id,
      user: member.id,
    });

    await infractions.deleteOne(mutes.pop());

    member.timeout(null, `Unmuted by ${message.author.tag}`);

    await sendLocalized(message, {
      keys: 'unmute:success',
      formatOptions: {
        user: member.toString(),
      },
    });
  }
}
