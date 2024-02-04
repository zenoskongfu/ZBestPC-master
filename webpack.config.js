const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
/**@type {import('webpack').Configuration} */
module.exports = {
	mode: "production",
	entry: {
		index: path.resolve(__dirname, "src/index.js"),
		login: path.resolve(__dirname, "./src/login.js"),
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png|jpeg|gif|svg)$/,
				type: "asset",
				parser: {
					dataUrlCondition: {
						maxSize: 4 * 1024,
					},
				},
				generator: {
					filename: "img/[name].[hash][ext]",
				},
			},
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
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/index.html"),
			filename: "index.html",
			chunks: ["index"],
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/login.html"),
			filename: "login.html",
			chunks: ["login"],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "./img"),
					to: path.resolve(__dirname, "dist/img"),
				},
			],
		}),
	],
	devtool: "source-map",
};
