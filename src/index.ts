import '#lib/setup';
const { AdvancedClient } = require('#lib/AdvancedClient');

const client = new AdvancedClient();

const main = async () => {
  try {
    client.logger.info('Logging in');
    await client.login(process.env.DISCORD_TOKEN);
    client.logger.info('logged in');
  } catch (error) {
    client.logger.fatal(error);
    client.destroy();
    process.exit(1);
  }
};

main();
