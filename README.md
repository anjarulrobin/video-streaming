## Description

A video streaming server created by nest framework. There is an API endpoint which serves a video file using nodejs stream. Proper http response format is followed, and the content is being served by chunk so that no extra pressure/load is created for serving bigger contents at the same time.
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
