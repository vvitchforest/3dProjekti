const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: {
        script: path.resolve(__dirname, '../src/js/script.js'),
        test: path.resolve(__dirname, '../src/js/test.js'),
        matterport: path.resolve(__dirname, '../src/js/matterport.js')
    },
    output:
    {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
        [
            new MiniCSSExtractPlugin(),

            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, '../static') }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html'),
                chunks: ['script'],
                filename: 'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/test.html'),
                chunks: ['test'],
                filename: 'test.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/matterport.html'),
                chunks: ['matterport'],
                inject: true,
                filename: 'matterport.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
        ],
    module:
    {
        rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use: ['html-loader']
                },

                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:
                        [
                            'babel-loader'
                        ]
                },

                // CSS SCSS
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },

                // Images
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use:
                        [
                            {
                                loader: 'file-loader',
                                options:
                                {
                                    outputPath: 'assets/images/'
                                }
                            }
                        ]
                },

                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use:
                        [
                            {
                                loader: 'file-loader',
                                options:
                                {
                                    outputPath: 'assets/fonts/'
                                }
                            }
                        ]
                }
            ]
    }
}
