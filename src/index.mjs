import path from "path"

import HtmlWebpackPlugin from "html-webpack-plugin"
import { options } from "@anzar/build"
import NzStylePlugin from "@anzar/build/src/plugins/style/plugin.js"


export function htmlPlugin(tpl, pluginOptions) {
    pluginOptions = pluginOptions || {}
    let params = pluginOptions.templateParameters || {}
    delete pluginOptions.templateParameters

    return new HtmlWebpackPlugin({
        title: options.TITLE,
        chunksSortMode: "auto",
        inject: false,
        template: tpl,
        templateParameters: function (compilation, assets, assetTags) {
            try {
                let css = {}

                for (let entry of assets.css) {
                    let norm = entry.replace(/\\+/, "/")

                    css[norm] = {
                        path: relativizePath(options.relative_assets, norm),
                        media: "all"
                    }
                }

                for (let filePath in compilation.assets) {
                    let entry = compilation.assets[filePath]
                    if (entry instanceof NzStylePlugin.CssSource) {
                        filePath = filePath.replace(/\\+/, "/")
                        css[filePath] = {
                            path: relativizePath(options.relative_assets, `/${filePath}`),
                            media: entry.media
                        }
                    }
                }

                return {
                    title: options.TITLE,
                    js: assets.js.map((entry) => { return { path: relativizePath(options.relative_assets, entry) } }),
                    css: Object.values(css),
                    headTags: assetTags.headTags.filter(v => v.tagName !== "script"),
                    ...params
                }
            } catch (e) {
                console.log(e)
            }
        },
        ...pluginOptions
    })
}


function relativizePath(relFrom, assetPath) {
    if (relFrom) {
        let assetAbsPath = path.join(options.out_path, assetPath.replace(/^[\\\/]+/, ""))
        let relFromAbs = relFrom === true
            ? options.out_path
            : path.isAbsolute(relFrom)
                ? relFrom
                : path.join(options.out_path, relFrom)
        return path.relative(relFromAbs, assetAbsPath).replace(/\\+/, "/")
    }
    return assetPath
}
