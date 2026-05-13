import 'dotenv/config';

type EnvironmentConfig = {
  baseUrl: string;
  hudlEmail?: string;
  hudlPassword?: string;
};

const getRequiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const env: EnvironmentConfig = {
  baseUrl: getRequiredEnv('BASE_URL'),
  hudlEmail: process.env.HUDL_EMAIL,
  hudlPassword: process.env.HUDL_PASSWORD,
};

export const hasHudlCredentials = (): boolean =>
  Boolean(env.hudlEmail && env.hudlPassword);
