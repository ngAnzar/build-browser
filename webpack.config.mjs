import path from "path"
import url from "url"

import { config, options } from "@anzar/build"


options.setAllDefault({
    __PLATFORM__: "browser",
    FEAT_CSS_VARIABLES: false,
    TITLE: "App is loading...",
    babel: () => {
        return {
            babelrc: false,
            compact: false,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        loose: true,
                        useBuiltIns: "usage",
                        corejs: { version: 3, proposals: true },
                        bugfixes: true,
                        exclude: [
                            "es.promise"
                        ],
                        targets: options.browserslist
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
    devServer: {
        contentBase: options.out_path,
        port: 4200,
        historyApiFallback: true
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
