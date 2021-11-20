const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: {
        script: path.resolve(__dirname, '../src/js/script.js'),
        layout: path.resolve(__dirname, '../src/js/layout.js'),
        test: path.resolve(__dirname, '../src/js/test.js'),
        matterport: path.resolve(__dirname, '../src/js/matterport.js'),
        cupixModel: path.resolve(__dirname, '../src/js/cupixModel.js'),
        cupixVirtualTour: path.resolve(__dirname, '../src/js/cupixVirtualTour.js')
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
                template: path.resolve(__dirname, '../src/index.pug'),
                chunks: ['script'],
                filename: 'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/layout.pug'),
                chunks: ['script'],
                filename: 'layout.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/test.pug'),
                chunks: ['test'],
                filename: 'test.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/matterport.pug'),
                chunks: ['matterport'],
                inject: true,
                filename: 'matterport.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/cupixModel.pug'),
                chunks: ['cupixModel'],
                inject: true,
                filename: 'cupixModel.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/cupixVirtualTour.pug'),
                chunks: ['cupixVirtualTour'],
                inject: true,
                filename: 'cupixVirtualTour.html',
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

                //PUG
                {
                    test: /\.pug$/,
                    use: ['html-loader', 'pug-html-loader']
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
                    use: [{
                        // inject CSS to page
                        loader: 'style-loader'
                      }, {
                        // translates CSS into CommonJS modules
                        loader: 'css-loader'
                      }, {
                        // Run postcss actions
                        loader: 'postcss-loader',
                        options: {
                          // `postcssOptions` is needed for postcss 8.x;
                          // if you use postcss 7.x skip the key
                          postcssOptions: {
                            // postcss plugins, can be exported to postcss.config.js
                            plugins: function () {
                              return [
                                require('autoprefixer')
                              ];
                            }
                          }
                        }
                      }, {
                        // compiles Sass to CSS
                        loader: 'sass-loader'
                      }]
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
