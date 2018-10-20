import path from "path"
import url from "url"

import { config, options } from "@anzar/build"
import { htmlPlugin } from "./src/index"

options.setAll({
    __PLATFORM__: "browser",
    FEAT_CSS_VARIABLES: false,
    TITLE: "App is loading...",
    babel: () => {
        return {
            babelrc: false,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        loose: true,
                        useBuiltIns: "usage",
                        targets: {
                            browsers: [
                                "last 2 versions",
                                "safari >= 7",
                                "ie 11"
                            ]
                        }
                    }
                ]
            ],
            plugins: [
                "babel-plugin-syntax-dynamic-import"
            ]
        }
    }
})

export default config("@anzar/build", {
    target: "web",
    plugins: [
        // htmlPlugin("relative://index.pug")
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
