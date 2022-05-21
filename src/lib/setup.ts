// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';

import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-api/register';
import '@sapphire/plugin-i18next/register';
import 'dotenv/config';
import { inspect } from 'util';

// Set default inspection depth
inspect.defaultOptions.depth = 1;
