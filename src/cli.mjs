import path from "path"
import url from "url"
import { cli } from "@anzar/build"
cli.init(process.argv)

const wp = new cli.Webpack()
const cfg = url.format({
    pathname: path.join(process.cwd(), "webpack.config.mjs"),
    protocol: "file:",
    slashes: true
})
console.log(cfg)
wp.loadConfig(cfg)

// import "webpack-cli/bin/webpack"
