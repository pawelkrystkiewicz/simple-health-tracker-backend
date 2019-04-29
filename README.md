# SEM - simple expenses manager (backend)

#### Paweł Krystkiewicz 2019 &copy;

# Quick start guide

## Add ormconfig.json

```
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "test",
    "password": "test",
    "database": "test"
}
```

## Add .env.development

#### EXAMPLE

```
SENDGRID_API_SECRET = #Not used yet
SENDGRID_API_KEY = #Not used yet
SESSION_TTL = 1000 * 60 * 60 * 48
SESSION_NAME = sid
SESSION_SECRET = supersecret
REDIS_HOST = 'redist.host.url'
REDIS_PASS = 'redis-pass'
REDIS_PORT = 6789
PORT = 4449
TECH_SUPPORT = your.mail @somedomain.com
MAIL_SENDER = sender.mail @somedomain.com
APP_ID = your_app_id_to_distinguish_in_your_apps
SERVICE_NAME = 'something_something_dark'
CLIENT_URL = 'http://localhost:3000'
```

## Already done?

Then just run

```
yarn
```

```
yarn start
```

Then have a look at `localhost:$PORT/graphql`

# Database structure

### TRANSACTION

| NAME       | TYPE      | CONSTRAINT | RELATED FIELD     |      NULLABLE      |
|------------|-----------|:----------:|-------------------|:------------------:|
| id         | int       |     PK     |                   |        :x:         |
| value      | float     |            |                   |        :x:         |
| createdAt  | timestamp |            |                   |        :x:         |
| updatedAt  | timestamp |            |                   |        :x:         |
| createdBy  | int       |   FK 1:1   | user[id]          |        :x:         |
| updatedBy  | int       |   FK 1:1   | user[id]          |        :x:         |
| currency   | int       |   FK 1:1   | currency[id]      |        :x:         |
| comment    | varchar   |            |                   | :heavy_check_mark: |
| repeat     | int       |   FK 1:1   | repeatPattern[id] | :heavy_check_mark: |
| type       | enum      |            |                   |        :x:         |
| category   | int       |   FK 1:N   | category[id]      |        :x:         |
| project    | int       |   FK 1:1   | project[id]       | :heavy_check_mark: |
| name       | varchar   |            |                   |        :x:         |
| account    | int       |   FK 1:1   | account[id]       | :heavy_check_mark: |
| attachment | int       |   FK 1:1   | attachment[id]    | :heavy_check_mark: |

### CURRENCY
##### AFTER ISO 4217

| NAME    | TYPE       | CONSTRAINT | NULLABLE |
|---------|------------|:----------:|:--------:|
| id      | int        |     PK     |   :x:    |
| country | varchar    |            |   :x:    |
| name    | varchar    |            |   :x:    |
| code    | varchar(3) |            |   :x:    |
| number  | int        |            |   :x:    |

### CATEGORY

| NAME        | TYPE      | CONSTRAINT |      NULLABLE      |
|-------------|-----------|:----------:|:------------------:|
| id          | int       |     PK     |        :x:         |
| name        | varchar   |            |        :x:         |
| description | varchar   |            | :heavy_check_mark: |
| createdAt   | timestamp |            |        :x:         |
| updatedAt   | timestamp |            |        :x:         |

### USER

| NAME       | TYPE      | CONSTRAINT |      NULLABLE      |
|------------|-----------|:----------:|:------------------:|
| id         | int       |     PK     |        :x:         |
| firstName  | varchar   |            |        :x:         |
| lastName   | varchar   |            |        :x:         |
| email      | varchar   |            |        :x:         |
| password   | varchar   |            |        :x:         |
| phone      | varchar   |            | :heavy_check_mark: |
| redeemCode | varchar   |            | :heavy_check_mark: |
| active     | boolean   |            |        :x:         |
| confirmed  | boolean   |            |        :x:         |
| createdAt  | timestamp |            |        :x:         |
| updatedAt  | timestamp |            |        :x:         |

### ACCOUNT

| NAME        | TYPE      | CONSTRAINT | RELATED FIELD |      NULLABLE      |
|-------------|-----------|:----------:|---------------|:------------------:|
| id          | int       |     PK     |               |        :x:         |
| name        | varchar   |            |               |        :x:         |
| number      | varchar   |            |               | :heavy_check_mark: |
| description | varchar   |            |               | :heavy_check_mark: |
| createdBy   | int       |   FK 1:1   | user[id]      |        :x:         |
| updatedBy   | int       |   FK 1:1   | user[id]      |        :x:         |
| createdAt   | timestamp |            |               |        :x:         |
| updatedAt   | timestamp |            |               |        :x:         |

### ATTACHEMENT

| NAME      | TYPE      | CONSTRAINT | RELATED FIELD / VALUE | NULLABLE |
|-----------|-----------|:----------:|-----------------------|:--------:|
| id        | int       |     PK     |                       |   :x:    |
| path      | varchar   |            |                       |   :x:    |
| fileType  | enum      |            | jpg \| png \| pdf     |   :x:    |
| type      | enum      |            | invoice \| receipt    |   :x:    |
| createdAt | timestamp |            |                       |   :x:    |
| updatedAt | timestamp |            |                       |   :x:    |

### PROJECT

| NAME        | TYPE      | CONSTRAINT |      NULLABLE      |
|-------------|-----------|:----------:|:------------------:|
| id          | int       |     PK     |        :x:         |
| name        | varchar   |            |        :x:         |
| description | varchar   |            | :heavy_check_mark: |
| createdAt   | timestamp |            |        :x:         |
| updatedAt   | timestamp |            |        :x:         |

### REPEAT PATTERN

| NAME      | TYPE      |  CONSTRAINT   | RELATED FIELD / VALUE |      NULLABLE      |
|-----------|-----------|:-------------:|-----------------------|:------------------:|
| id        | int       |      PK       |                       |        :x:         |
| amount    | int       |               |                       |        :x:         |
| unit      | enum      | interval unit | d \| m \| q \| y      |        :x:         |
| startAt   | timestamp |               |                       |        :x:         |
| endAt     | timestamp |               |                       | :heavy_check_mark: |
| name      | varchar   |               |                       |        :x:         |
| createdAt | timestamp |               |                       |        :x:         |
| updatedAt | timestamp |               |                       |        :x:         |


This enum will be used to multiply by interval amount.
 `nextDate = lastDate + interval * intervalType`

```
export enum intervalType = {
    days: 1,
    months: 30,
    quarters: 90,
    years: 365
}
```

### TRANSACTION TYPE

- INCOME
- EXPENSE
- TRANSFER