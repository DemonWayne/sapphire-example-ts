import { Listener } from '@sapphire/framework';
import type { Guild } from 'discord.js';
const Guilds = require('../models/guild');

export class GulidDeleteListener extends Listener {
  public async run(guild: Guild) {
    const guildDB = await Guilds.findOne({ guildId: guild.id });
    if (guild && guildDB) {
      await Guilds.deleteOne({ guildId: guild.id });
      this.container.logger.info(`${guild.name} removed from DataBase`);
    }
  }
}
