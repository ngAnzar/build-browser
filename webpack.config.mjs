import path from "path"
import url from "url"

import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

import { config, options } from "@anzar/build"

options.setAll({
    __PLATFORM__: "browser",
    FEAT_CSS_VARIABLES: false,
    TITLE: "App is loading..."
})


export default config("@anzar/build", {
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({
            title: options.TITLE,
            chunksSortMode: "dependency",
            inject: false,
            template: "relative://index.pug"
        })
    ],
    whenMode: {
        development(cfg, key) {
            return {
                devServer: {
                    contentBase: path.join(options.project_path, "dist", "[__MODE__]"),
                    port: 4200,
                    // hot: options.hot,
                    historyApiFallback: true,
                    // clientLogLevel: "error",
                    // stats: "errors-only"
                },

                // plugins: [
                //     new webpack.HotModuleReplacementPlugin()
                // ]
            }
        }
    },
    constants: {
        __DEV_SERVER__(cfg, key) {
            if (cfg.devServer) {
                let dvs = cfg.devServer
                return url.format({
                    protocol: dvs.https ? "https" : "http",
                    hostname: dvs.host ? dvs.host : "localhost",
                    port: dvs.port
                })
            } else {
                return null
            }
        }
    }
})
