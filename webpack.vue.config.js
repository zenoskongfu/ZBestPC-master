const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const resolve = (subPath) => {
	return path.resolve(__dirname, subPath);
};
/**@type {import('webpack').Configuration} */
const config = {
	mode: "production",
	entry: resolve("./src/main.js"),
	output: {
		path: resolve("dist"),
		filename: "index.js",
	},
	module: {
		rules: [
			{
				test: /.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /.(png|jpg|jpeg|svg|gif)$/,
				type: "asset",
				parser: {
					dataUrlCondition: {
						maxSize: 4 * 1024,
					},
				},
				generator: {
					filename: "[name].[hash:6][ext]",
				},
			},
			{
				test: /.vue$/,
				use: ["vue-loader"],
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
		new HtmlWebpackPlugin({
			template: resolve("./public/index.html"),
			filename: "index.html",
		}),
		new CopyPlugin({
			patterns: [
				{
					from: resolve("./img"),
					to: resolve("dist/img"),
				},
			],
		}),
		new vueLoaderPlugin(),
	],
};

module.exports = config;
