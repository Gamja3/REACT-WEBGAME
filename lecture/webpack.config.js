const path = require("path");
const webpack = require("webpack");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    name: "wordrelay-setting",
    mode: "development", // 실서비스: "production"
    devtool: "eval", // 실서비스: "hidden-source-map"
    resolve: {
        extensions: [".js", ".jsx"],
    },

    entry: {
        app: ["./client"],
    }, // 입력

    module: {
        rules: [
            {
                test: /\.jsx?/, // .js 및 .jsx 파일 매칭 정규식
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: [
                                        "> 5% in KR",
                                        "last 2 chrome versions",
                                    ],
                                },
                                debug: true,
                            },
                        ],
                        "@babel/preset-react",
                    ],
                    plugins: ["react-refresh/babel"],
                },
            },
        ],
    },
    plugins: [new RefreshWebpackPlugin()],

    output: {
        path: path.join(__dirname, "dist"), // 출력 디렉토리
        filename: "app.js",
    }, // 출력 파일
    devServer: {
        devMiddleware: { publicPath: "/dist" },
        static: {
            directory: path.resolve(__dirname),
        },
        hot: true,
        compress: true,
        // port: 9000,
    },
};
