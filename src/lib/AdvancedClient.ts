import { SapphireClient } from '@sapphire/framework';
import type { InternationalizationContext } from '@sapphire/plugin-i18next';
import { connect } from 'mongoose';
import guild from '../models/guild';

export class AdvancedClient extends SapphireClient {
  public constructor() {
    super({
      defaultPrefix: '/',
      disableMentionPrefix: true,
      intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
      i18n: {
        fetchLanguage: async (context: InternationalizationContext) => {
          if (!context.guild) return 'ru-RU';

          const guildSettings = await guild.findOne({ guildId: context.guild!.id });
          if (!guildSettings || !guildSettings.language) return 'ru-RU';
          return guildSettings.language;
        },
      },
      api: {
        auth: {
          id: (process.env.CLIENT_ID ??= ''),
          secret: (process.env.CLIENT_SECRET ??= ''),
          cookie: 'SAPPHIRE_AUTH',
          redirect: 'http://localhost:4000',
          scopes: ['identify'],
        },
        listenOptions: {
          port: Number(process.env.PORT) || 4000,
        },
      },
      sweepers: { messages: { lifetime: 60, interval: 120 } },
    });
  }

  public connectDatabase() {
    connect((process.env.DATABASE_URL ??= ''), {}, err => {
      if (err) throw err;
      this.logger.info('[Database] MongoDB connected successfully.');
    });
  }

  public async login(token?: string) {
    this.connectDatabase();
    return await super.login(token);
  }
}
