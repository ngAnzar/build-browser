import path from "path"
import url from "url"

import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

import { config, options } from "@anzar/build"


options.setAll({
    __PLATFORM__: "browser",
    FEAT_CSS_VARIABLES: false
})


export default config("@anzar/build", {
    whenMode: {
        development(cfg, key) {
            return {
                devServer: {
                    contentBase: path.join(options.package_path, "dist", "[__MODE__]"),
                    port: 4200,
                    hot: options.hot,
                    historyApiFallback: true,
                    clientLogLevel: "error",
                    stats: "errors-only"
                },

                plugins: [
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NamedModulesPlugin(),
                    new HtmlWebpackPlugin({
                        chunksSortMode: "dependency",
                        inject: false,
                        template: path.join(__dirname, "index.pug")
                    })
                ]
            }
        }
    },
    constants: {
        __DEV_SERVER__(defs, cfg, key) {
            if (options.isServing && cfg.devServer) {
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
