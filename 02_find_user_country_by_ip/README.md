### FIND USER COUNTRY BY IP

In this task I implement a simple REST API using the Express framework. The essence of the API is to detect user's ip
address and country of origin.

The app provides /location endpoint for POST requests with an ipv4 address in the body, it will try to establish
location of the sender of the request too,
returning an array of json objects, where the first one is info on the sender, and the second one is info on the ip
provided in the request body.
The lookup of the location only works for ipv4 addresses.

To work the app needs a CSV file with ip ranges and associated locations. The path to the file should be provided in
the .env
file. One place to get it is: https://lite.ip2location.com/database/ip-country

Example of the response:

```json
[
  {
    "success": true,
    "ipData": {
      "ip": "45.232.208.143",
      "country": "Chile",
      "readable": "Chile - 45.232.208.143"
    }
  },
  {
    "success": true,
    "ipData": {
      "ip": "185.182.120.34",
      "country": "Armenia",
      "readable": "Armenia - 185.182.120.34"
    }
  }
]
```

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