import { Precondition } from '@sapphire/framework';
import { resolveKey } from '@sapphire/plugin-i18next';
import type { Message } from 'discord.js';
import Guild from '#models/guild';

export class modOnly extends Precondition {
  public async run(message: Message) {
    const guild = await Guild.findOne({ guildId: message.guildId });
    return message.member!.permissions.has(8n) || guild!.modRoles.includes(message.author.id)
      ? this.ok()
      : this.error({ message: await resolveKey(message, 'preconditions:mod') });
  }
}

declare module '@sapphire/framework' {
  interface Preconditions {
    modOnly: never;
  }
}
