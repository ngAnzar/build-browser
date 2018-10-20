import HtmlWebpackPlugin from "html-webpack-plugin"
import { options } from "@anzar/build"
import nzStyle from "@anzar/build/src/plugins/style"


export function htmlPlugin(tpl, pluginOptions) {
    pluginOptions = pluginOptions || {}
    let params = pluginOptions.templateParameters || {}
    delete pluginOptions.templateParameters

    return new HtmlWebpackPlugin({
        title: options.TITLE,
        chunksSortMode: "dependency",
        inject: false,
        template: tpl,
        templateParameters: function (compilation, data) {
            let css = {}

            for (let entry of data.css) {
                let norm = entry.replace(/\\+/, "/")
                css[norm] = { path: norm, media: "all" }
            }

            for (let filePath in compilation.assets) {
                let entry = compilation.assets[filePath]
                if (entry instanceof nzStyle.CssSource) {
                    filePath = filePath.replace(/\\+/, "/")
                    css[filePath] = { path: `/${filePath}`, media: entry.media }
                }
            }

            return {
                title: options.TITLE,
                js: data.js.map((entry) => { return { path: entry } }),
                css: Object.values(css),
                ...params
            }
        },
        ...pluginOptions
    })
}
