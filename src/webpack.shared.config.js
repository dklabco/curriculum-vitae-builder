const path = require("path");

const mode = process.env.NODE_ENV || "production";

console.log(`webpack operating under mode \`${mode}\``);

module.exports = {

    mode,
    watch: process.env.WATCH === "true", // @TODO check why this doesn't work the same as with webpack@4 & webpack-cli@3?

    output: {
        path: undefined, // to be defined by the client-side or server-side app build step
        filename: undefined // to be defined by the client-side or server-side app build step
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"], // '.js' is so that React itself can be compiled (though this is not required during prod)
        unsafeCache: false
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    /* the following optimization is disabled for the sake of simplicity for the exercise */
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows caching those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};
