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
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
	],
	devtool: "source-map",
};
