import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors = require('cors')
import 'dotenv';
import express from 'express';
import session from 'express-session';
// import QueryComplexity, { fieldConfigEstimator, simpleEstimator } from 'graphql-query-complexity';
import Redis from 'ioredis';
import 'reflect-metadata';
import { formatArgumentValidationError } from 'type-graphql';
import { createConnection } from 'typeorm';
import { testConn } from './testUtils/testConn';
import { createSchema } from './utils/createSchema';
import * as config from './utils/config';

export const redis = new Redis({
	port: Number(config.REDIS_PORT), // Redis port
	host: `${config.REDIS_HOST}`, // Redis host
	family: 4, // 4 (IPv4) or 6 (IPv6)
	password: `${config.REDIS_PASS}`
});

export const main = async () => {
	if (process.env.NODE_ENV === 'test') {
		await testConn(true);
	} else {
		await createConnection();
	}
	const schema = await createSchema();
	const apolloServer = new ApolloServer({
		schema,
		formatError: formatArgumentValidationError as any,
		context: ({ req, res }) => ({ req, res, redis }),
		playground: {
			settings: {
				'general.betaUpdates': false,
				'editor.cursorShape': 'line',
				'editor.fontSize': 14,
				'editor.fontFamily':
					"'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
				'editor.theme': 'dark',
				'editor.reuseHeaders': true,
				'prettier.printWidth': 80,
				'request.credentials': 'include',
				'tracing.hideTracingResponse': true
			}
		}
	});

	const app = express();
	const corsOptions:cors.CorsOptions={
		origin: `${config.CLIENT_URL}`,
		credentials: true
	}
	

	const RedisStore = connectRedis(session);

	app.use(
		session({
			store: new RedisStore({
				client: redis as any
			}),
			name: `${config.SESSION_NAME}`,
			secret: `${config.SESSION_SECRET}`,
			resave: false,
			rolling: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: process.env.NODE_ENV === 'production',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 1000 * 3600 * 24 * 7
			}
		})
	);
	const port = Number(config.PORT);
	apolloServer.applyMiddleware({ app, cors: corsOptions });

	app.listen(port, () => {
		console.log(`Server is ready on http://localhost:${port}/graphql`);
	});
};

main();
