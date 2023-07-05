### JSON STORAGE

In this task I implement a simple REST API using the Express framework. The essence of the API is to allow user to store
any json data at any path in the working directory on the server, if a record at a specified path already exists, user
is not allowed to
overwrite the existing record and has to choose another path.

To run the app:

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
node ./src/index.js
```