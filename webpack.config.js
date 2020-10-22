/**
 * Proto-Player
 *
 * Copyright (C) 2020, Loïc Le Page
 * Released under the MIT license.
 */

"use strict";

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDevServer = process.argv.includes("serve");

module.exports = {
    target: ["web", "es6"],
    mode: isDevServer ? "development" : "production",
    devtool: isDevServer ? "eval" : "source-map",

    entry: { "proto-player": "./src/proto-player" },
    output: { filename: "[name]-[contenthash].min.js" },

    devServer: {
        contentBase: false,
        open: true
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "css-loader",
                        options: { sourceMap: false }
                    },
                    {
                        loader: "simplify-loader",
                        options: {
                            crlf: true,
                            whitespace: false
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
                terserOptions: {
                    ecma: 2015,
                    toplevel: true,
                    output: {
                        comments: false,
                        preamble: "/*! Proto-Player | Released under the MIT license | Copyright(C) 2020, Loïc Le Page */"
                    }
                }
            })
        ]
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "head"
        })
    ]
};
