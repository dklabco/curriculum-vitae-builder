const webpack = require("webpack");
const path = require("path");
const sharedConfig = require("../webpack.shared.config");

if (!process.env.WEBPACK_SERVER_APP_OUTPUT_DIR) {
  console.error("Please specify env `WEBPACK_SERVER_APP_OUTPUT_DIR`");
  process.exit(1);
}

if (!process.env.WEBPACK_SERVER_APP_OUTPUT_FILENAME) {
  console.error("Please specify env `WEBPACK_SERVER_APP_OUTPUT_FILENAME`");
  process.exit(1);
}

module.exports = {
  ...sharedConfig,
  target: "node",
  entry: path.resolve(__dirname, "main.ts"),
  output: {
    path: process.env.WEBPACK_SERVER_APP_OUTPUT_DIR,
    filename: process.env.WEBPACK_SERVER_APP_OUTPUT_FILENAME,
    umdNamedDefine: false
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  resolve: {
    ...sharedConfig.resolve,
    extensions: [".ts", ".tsx", ".js"],
    alias: {
        shared: path.resolve(__dirname, "../shared/")
    }
  },
  externals: {
    "unit-http": "commonjs unit-http"
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: sharedConfig.mode,
      LINKEDIN_APP_REDIRECT_URI: process.env.LINKEDIN_APP_REDIRECT_URI,
      LINKEDIN_APP_CLIENT_ID: process.env.LINKEDIN_APP_CLIENT_ID,
      LINKEDIN_APP_CLIENT_SECRET: process.env.LINKEDIN_APP_CLIENT_SECRET
    })
  ]
};
