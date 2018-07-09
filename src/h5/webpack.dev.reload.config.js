import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
// import getIPAddress from './app/utils/getIpAddress';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const assetsDir = path.resolve(__dirname, 'build/h5');
export const localDev = true;
export const localIP = 'localhost'//getIPAddress();
const jsPath = localDev ? '//' + localIP + ':3000/build/h5/' : '//js.t.sinajs.cn/c2p/purchase/wawa/h5/';

let config = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?' + (localDev ? '//' + localIP + ':3000' : '//js.t.sinajs.cn'),
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'app/index.js')
    ],
    output: {
        path: assetsDir,
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.[hash].js',
        publicPath: jsPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'webpack-zepto',
            'Zepto': 'webpack-zepto'
        }),
        new webpack.ProvidePlugin({
            Swiper: 'swiper'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          })        
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules[\\\/](?!wbpay-repoch)|wbpay-repoch.*node_modules/,
                loader: require.resolve('babel-loader'),
                options: {
                    "presets": [
                        require.resolve("babel-preset-react"),
                        [
                            require.resolve("babel-preset-es2015"),
                            { modules: false }
                        ],
                        require.resolve("babel-preset-stage-0")
                    ],
                    // "plugins": [
                    //     require.resolve("babel-plugin-transform-decorators-legacy"),
                    // ],
                    // "env": {
                    //     "development": {
                    //         "plugins": [
                    //             [
                    //                 // require.resolve("react-hot-loader/babel"),
                    //                 // require.resolve("babel-plugin-react-transform"),
                    //                 // {
                    //                 //     "transforms": [
                    //                 //         {
                    //                 //             "transform": require.resolve("react-transform-catch-errors"),
                    //                 //             "imports": [
                    //                 //                 require.resolve("react"),
                    //                 //                 require.resolve("redbox-react")
                    //                 //             ]
                    //                 //         }
                    //                 //     ]
                    //                 // }
                    //             ]
                    //         ]
                    //     }
                    // },                    
                    // cacheDirectory: path.join(root, '.babelcache')
                }
            },            
            {
                // 文件解析
                test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
                // include: path.resolve(__dirname, "src"),
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: ''
                        }
                }]
              },
            {
                test: /\.(png|jpg|gif)(\?|$)/,
                // include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },{
                test: /\.css$/,
                // exclude: /node_modules/,
                // exclude: /node_modules[\\\/](?!@wbpay-repoch)|@wbpay-repoch.*node_modules/,
                use: [
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options:{}
                    // },
                    { loader: 'style-loader' },
                    // { loader: require.resolve('isomorphic-style-loader') },
                    { 
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            // importLoaders: 1,
                            // localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    { 
                        loader: require.resolve('postcss-loader'),
                        options: {
                            plugins: () => [require('precss'), require('autoprefixer')]
                        }
                    }
                ]
            },{
                test: /\.scss$/,
                // exclude: /node_modules/,
                // exclude: /node_modules[\\\/](?!@wbpay-repoch)|@wbpay-repoch.*node_modules/,
                use: [
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options:{}
                    // },
                    { loader: require.resolve('style-loader') },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            // modules: true,
                            // importLoaders: 1,
                            // // localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    { 
                        loader: require.resolve('postcss-loader'),
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                    { loader: require.resolve('sass-loader') },

                ]
            }],        

    },
    resolve: {
        extensions: [ ".js", ".jsx", ".scss", ".json"],
    },

};
Object.assign(config, localDev && {
    devServer: {
        contentBase: '/',
        host: 'localhost',
        port: 3000,
        inline: true,
    }
})
export default config;