import 'dotenv/config';

type EnvironmentConfig = {
  baseUrl: string;
  hudlEmail: string;
  hudlPassword: string;
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
  hudlEmail: getRequiredEnv('HUDL_EMAIL'),
  hudlPassword: getRequiredEnv('HUDL_PASSWORD'),
};
