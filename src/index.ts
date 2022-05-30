import '#lib/setup';
import { AdvancedClient } from '#lib/AdvancedClient';

const client = new AdvancedClient();

(async () => {
  client.logger.info('Logging in');
  await client.login().catch();
  client.logger.info('logged in');
})().catch(error => {
  client.logger.fatal(error);
  client.destroy();
  process.exit(1);
});
