const path = require('path');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./client/scripts/index.tsx",
    output: {
        filename: "client.js",
        path: path.resolve(__dirname, "./dist/")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
}