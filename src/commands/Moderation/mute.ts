import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';
import type { Message } from 'discord.js';
import infractions from '#models/infractions';
import { sendArgsError, resolveDuration } from '#utils/index';

@ApplyOptions<Command.Options>({ description: 'Mute command', preconditions: ['GuildOnly', 'modOnly'] })
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    const Arguments = [
      { name: 'member', type: 'user', required: true },
      { name: 'duration', type: 'duration', required: true },
      { name: 'reason', type: 'reason', required: false },
    ];

    const member = await args.pick('member').catch(() => sendArgsError(message, Arguments));
    if (!member) return;
    const durationString = await args.pick('duration').catch(() => sendArgsError(message, Arguments));
    if (!durationString) return;
    const reason = await args.repeat('string').catch(() => 'None');

    const duration = resolveDuration(durationString);

    if (!member.moderatable) {
      await sendLocalized(message, {
        keys: 'mute:erorr',
      });
      return;
    }

    if (member.isCommunicationDisabled()) {
      await sendLocalized(message, {
        keys: 'mute:erorr_muted',
        formatOptions: { timestamp: `<t:${Math.ceil(member.communicationDisabledUntilTimestamp / 1000)}:F>` },
      });
      return;
    }

    member.timeout(duration, `${reason} by ${message.author.tag}`);

    await infractions.create({
      guildId: message.guildId,
      user: member.id,
      staff: message.member!.id,
      expiresAt: Date.now() + duration,
      reason: reason.toString(),
    });

    await sendLocalized(message, {
      keys: 'mute:success',
      formatOptions: {
        user: member.toString(),
        timestamp: `<t:${Math.ceil((Date.now() + duration) / 1000)}:F>`,
      },
    });
  }
}
