### Getting Started

```console
$ git clone git@github.com:0x78bb3c/fees-dashboard-api.git

$ cd fee-dash-backend
```

### Build & Run

Change the database URL in .env file

```console
$ yarn

$ npx prisma migrate dev

$ yarn run build && node public/main.js
```

### Endpoints

GET `/course/get/all`
get all courses in json array format

POST `/course/new`
Args: Urlencoded arguments `course`, `total_fee`
Response:
json object with `message` object
