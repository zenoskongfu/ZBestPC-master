const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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

	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		port: 8999,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
		client: {
			overlay: false,
		},
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
						maxSize: 224 * 1024,
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
			title: "最家首页",
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
		new CleanWebpackPlugin(),
	],
};

module.exports = config;
