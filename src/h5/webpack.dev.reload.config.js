import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
// import getIPAddress from './app/utils/getIpAddress';

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
                    ]
                }
            },            
            {
                // 文件解析
                test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
                include: path.resolve(__dirname, "src"),
                use: ["file-loader?name=assets/[name].[ext]"]
              },
            {
                test: /\.(png|jpg|gif)(\?|$)/,
                include: path.resolve(__dirname, "src"),
                use: ["url-loader?limit=8192&name=assets/[name].[ext]"]
            },{
                test: /\.css$/,
                // exclude: /node_modules/,
                // exclude: /node_modules[\\\/](?!@wbpay-repoch)|@wbpay-repoch.*node_modules/,
                use: [
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
                            plugins: () => [require('autoprefixer')]
                        }
                    }
                ]
            },{
                test: /\.scss$/,
                // exclude: /node_modules/,
                // exclude: /node_modules[\\\/](?!@wbpay-repoch)|@wbpay-repoch.*node_modules/,
                use: [
                    { loader: require.resolve('style-loader') },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            // modules: true,
                            // importLoaders: 1,
                            // // localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    { loader: require.resolve('sass-loader') },
                    { 
                        loader: require.resolve('postcss-loader'),
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    }
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