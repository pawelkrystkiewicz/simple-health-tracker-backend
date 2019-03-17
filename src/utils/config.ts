import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
	case 'test':
		path = `${__dirname}/../../.env.test`;
		break;
	case 'production':
		path = `${__dirname}/../../.env.production`;
		break;
	default:
		path = `${__dirname}/../../.env.development`;
}
dotenv.config({
	path: path
});

export const PORT = process.env.PORT;
export const SENDGRID_API_SECRET = process.env.SENDGRID_API_SECRET;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const TECH_SUPPORT = process.env.TECH_SUPPORT;
export const MAIL_SENDER = process.env.MAIL_SENDER;
export const APP_ID = process.env.APP_ID;
export const SERVICE_NAME = process.env.SERVICE_NAME;
export const CLIENT_URL = process.env.CLIENT_URL;
export const SESSION_TTL = process.env.SESSION_TTL;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const SESSION_NAME = process.env.SESSION_NAME;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PASS = process.env.REDIS_PASS;
export const USE_SESSION = process.env.USE_SESSION;
