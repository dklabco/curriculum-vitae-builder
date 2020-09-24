# Curriculum-Vitae Builder

[![Build Status](https://travis-ci.com/dklabco/curriculum-vitae-builder.svg?branch=master)](https://travis-ci.com/dklabco/curriculum-vitae-builder)

## How to start the dev mode

1. clone this project and `cd` into the project root directory
2. run `npm install` (it'll take a while to download all frontend & backend libraries & DevTools)
3. run `npm run dev` then follow the pointer from the console log

Changes to the client-side or server-side code will be picked up automatically

## How to generate the production build

```javascript
NODE_ENV=production npm run build
```

When the script finishes, the server app should be available at `build/server/main.js`, which can be ran with `node` itself, or your process manager of choice (e.g. `pm2`)

## How to test

From the project root directory, run:
```bash
npm test
```

## Environment Variables

- `PORT`: if set, the app will be available on this port number; otherwise, a random port will be chosen

## Current Caveats

- Source mapping doesn't work yet for the server app, and thus JS error logs are not pointing to the desirable line/column in the .ts files
- Hot live-reloading is not enabled for client-side assets yet
- The build is not yet optimized (output sizes larger than they could be in real production setups)
- There is no example test suite for the backend part (REST endpoints)
- The dev flow (build/start) was not tested on platforms other than MacOS
