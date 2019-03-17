import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv';
import express from 'express';
import session from 'express-session';
import QueryComplexity, { fieldConfigEstimator, simpleEstimator } from 'graphql-query-complexity';
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
		debug: false,
		validationRules: [
			QueryComplexity({
				maximumComplexity: 50,
				variables: {},
				estimators: [
					fieldConfigEstimator(),
					simpleEstimator({
						defaultComplexity: 1
					})
				]
			})
		] as any
	});

	const app = express();
	const corsOptions: cors.CorsOptions = {
		origin: [String(config.CLIENT_URL)],
		credentials: true,
	};
	app.use(cors(corsOptions));


	const RedisStore = connectRedis(session);
	// const maxAge=Number(config.SESSION_TTL);
	console.log(config.CLIENT_URL);

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

	apolloServer.applyMiddleware({ app });

	app.listen(port, () => {
		console.log(`Server is ready on http://localhost:${port}/graphql`);
	});
};

main();
