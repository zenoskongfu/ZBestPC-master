const path = require("path");
const webpack = require("webpack");
const $ = require("jquery");
/**@type {import('webpack').Configuration} */
module.exports = {
	mode: "production",
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
	],
	devtool: "source-map",
};
