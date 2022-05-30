import { ApplyOptions } from '@sapphire/decorators';
import { ApiRequest, ApiResponse, methods, Route } from '@sapphire/plugin-api';
import infractions from '#models/infractions';

@ApplyOptions<Route.Options>({ route: 'mutes' })
export class MutesRoute extends Route {
  public async [methods.GET](_request: ApiRequest, response: ApiResponse) {
    // TODO HTML RESPONSE
    const guild = '941315013510037514';
    const mutes = await infractions.find({ guildId: guild, type: 0 });
    response.text(
      `${mutes
        .map(
          (mute: any) =>
            `${mute.user} | ${mute.reason} | ${mute.createdAt.toLocaleString()} | ${mute.expiresAt.toLocaleString()}`,
        )
        .join('\n')}`,
    );
  }

  public async [methods.POST](_request: ApiRequest, response: ApiResponse) {
    const { body }: any = _request;
    const { guild, user } = body;
    const mutes = await infractions.find({ guildId: guild, type: 0, user });
    response.json({
      mutes: mutes.map(
        (mute: any) => `${mute.reason} | ${mute.createdAt.toLocaleString()} | ${mute.expiresAt.toLocaleString()}`,
      ),
    });
  }
}
