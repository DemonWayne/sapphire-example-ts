import { Schema, model, Date } from 'mongoose';

interface IInfraction {
  guildId: string;
  type: number;
  user: string;
  staff: string;
  reason: string;
  createdAt: Date;
  expiresAt: Date;
}

const infractionSchema = new Schema<IInfraction>(
  {
    guildId: { type: String, required: true },
    type: { type: Number, default: 0 },
    user: { type: String, required: true },
    staff: { type: String, required: true },
    reason: { type: String, default: 'None' },
    createdAt: { type: Date, default: new Date() },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false },
);

export = model<IInfraction>('Infraction', infractionSchema);
