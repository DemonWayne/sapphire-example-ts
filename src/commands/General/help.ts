import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { EmbedFieldData, Message, MessageEmbed } from 'discord.js';

@ApplyOptions<Command.Options>({ description: 'Help command' })
export class UserCommand extends Command {
  public async messageRun(message: Message) {
    const commandsWithoutSort = this.container.stores.get('commands');

    const { DEVS } = process.env;
    const isDev = DEVS!.includes(message.author.id);
    const fields: Array<EmbedFieldData> = [];
    commandsWithoutSort.forEach(cmd => {
      if (!cmd.name || (['Developers', 'Dev'].includes(cmd.category || 'General') && !isDev)) return;
      const field = fields.find(f => f.name === cmd.category);
      if (!field) {
        fields.push({
          name: `${cmd.category}`,
          value: `${cmd.enabled ? '🟢' : '🔴'} ${cmd.name} - ${cmd.description}`,
        });
      } else if (field) {
        field.value += `\n${cmd.enabled ? '🟢' : '🔴'} ${cmd.name} - ${cmd.description}`;
      }
    });

    await message.reply({ embeds: [new MessageEmbed().setTitle('Help').setFields(fields)] });
  }
}
