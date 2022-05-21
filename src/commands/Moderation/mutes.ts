import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { fetch, FetchResultTypes, FetchMethods } from '@sapphire/fetch';
import { resolveKey } from '@sapphire/plugin-i18next';
import { Message, MessageEmbed } from 'discord.js';
const { sendArgsError } = require('#utils/index');

@ApplyOptions<Command.Options>({ description: 'Mutes list', preconditions: ['GuildOnly', 'modOnly'] })
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    const Arguments = [{ name: 'member', type: 'user', required: true }];

    const member = await args.pick('member').catch(() => sendArgsError(message, Arguments));
    if (!member) return;

    const { mutes } = await fetch(
      'http://localhost:4000/mutes',
      {
        method: FetchMethods.Post,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guild: message.guildId,
          user: member.id,
        }),
      },
      FetchResultTypes.JSON,
    );

    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(`${await resolveKey(message, 'mutes:title')} ${member.displayName || member.user.username}`)
          .setDescription(mutes.slice(0, 25).join('\n')),
      ],
    });
  }
}
