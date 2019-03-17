import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    host: 'ec2-54-75-230-41.eu-west-1.compute.amazonaws.com',
    port: 5432,
    username: 'ucotckfpqazqxl',
    password: 'c9965a655f2bc55f9611eba28ce7bf853fb6dcde92476eb1e2b6edd5466a7242',
    database: 'd1gjostr68g7u',
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + '/../entity/*.*'],
  });
};
