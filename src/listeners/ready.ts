import { Listener } from '@sapphire/framework';
import type { Client } from 'discord.js';

export class ReadyListener extends Listener {
  public run(client: Client) {
    this.container.logger.info(`Bot started and authorized as ${client.user!.tag}`);
  }
}
