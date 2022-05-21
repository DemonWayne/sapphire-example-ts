import { Listener } from '@sapphire/framework';

export class CommandErrorListener extends Listener {
  public run(error: Error) {
    const warning = error.stack;
    this.container.logger.error(warning);
  }
}
