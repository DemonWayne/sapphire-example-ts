import { Listener } from '@sapphire/framework';
import type { Guild } from 'discord.js';
import Guilds from '#models/guild';

export class GulidCreateListener extends Listener {
  public async run(guild: Guild) {
    const guildDB = await Guilds.findOne({ guildId: guild.id });
    if (guild && !guildDB) {
      await Guilds.create({ guildId: guild.id });
      this.container.logger.info(`${guild.name} added to DataBase`);
    }
  }
}
