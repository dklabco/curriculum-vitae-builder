const webpack = require("webpack");
const path = require("path");
const sharedConfig = require("../webpack.shared.config");

if (!process.env.WEBPACK_CLIENT_APP_OUTPUT_DIR) {
  console.error("Please specify env `WEBPACK_SERVER_APP_OUTPUT_DIR`");
  process.exit(1);
}

if (!process.env.WEBPACK_CLIENT_APP_OUTPUT_FILENAME) {
  console.error("Please specify env `WEBPACK_SERVER_APP_OUTPUT_FILENAME`");
  process.exit(1);
}

module.exports = {
  ...sharedConfig,
  target: "web",
  entry: path.resolve(__dirname, "./main.tsx"),
  output: {
    path: process.env.WEBPACK_CLIENT_APP_OUTPUT_DIR,
    filename: process.env.WEBPACK_CLIENT_APP_OUTPUT_FILENAME
  },
  resolve: {
    ...sharedConfig.resolve,
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"], // '.js' is so that React itself can be compiled (though this is not required during prod)
    alias: {
      shared: path.resolve(__dirname, "../shared/")
    }
  },
  // this is needed in webpack v5 (in RC at writing time)
  plugins: [
    ...(sharedConfig.plugins || []),
    new webpack.DefinePlugin({
      // "process.env": `{"NODE_ENV":"${process.env.NODE_ENV || "production"}}"` // @TODO check why this fails for BlueprintJS
      "process.env": "{}"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: sharedConfig.mode
    })
  ]
};
