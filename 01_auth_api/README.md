### AUTH API

In this task I implement a simple REST API using the Express framework. The essence of the API is to register and
authorize users using JWT tokens.

To run the app, you need to have [Docker](https://www.docker.com/) installed.

Up database:

```bash
docker-compose up -d
```

Compile the app (Windows)

```bash
tsc.cmd
```

Compile the app (Unix)

```bash
tsc
```

Start the app:

```bash
node ./build/index.js
```

Down database:

```bash
docker-compose down
```

Enter database:

```bash
docker-compose exec postgres psql -U auth -W auth
```
