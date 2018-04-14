import webpack from "webpack"
import { config, options } from "@anzar/build"


options.setAll({
    platform: () => "browser",
    FEAT_CSS_VARIABLES: false
})


export default config("@anzar/build", {

}).ifMode("development", {
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
        new webpack.NamedModulesPlugin()
    ]
})
