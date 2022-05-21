import { Schema, model } from 'mongoose';

interface IGuild {
  guildId: string;
  language: string;
  modRoles: [string];
}

const GuildSchema = new Schema<IGuild>(
  {
    guildId: { type: String, required: true },
    language: { type: String, default: 'ru-RU' },
    modRoles: { type: [String], default: [''] },
  },
  { versionKey: false },
);

export = model<IGuild>('Guild', GuildSchema);
