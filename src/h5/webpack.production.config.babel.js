import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

var host = '//js.t.sinajs.cn/c2p/purchase';
var pdPath = '/wawa/h5/';
// const nodeModulesDir  = path.resolve(__dirname, 'node_modules');
const assetsDir = path.resolve(__dirname, '../../build' + pdPath);
const jsPath = host + pdPath;

let config = {
    entry: {
        h5: path.resolve(__dirname, 'app/index.js')
    },
    output: {
        path: assetsDir,
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.[hash].js',
        publicPath: jsPath
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'webpack-zepto',
            'Zepto': 'webpack-zepto'
        }),
        new webpack.ProvidePlugin({
            Swiper: 'swiper'
        }),
        new webpack.optimize.MinChunkSizePlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    postcss: function () {
        return [precss, autoprefixer];
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel', 'babel-loader'],
            // exclude: [nodeModulesDir],
            include: path.join(__dirname)
        }, {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
            loader: 'url?limit=100@name=[name][ext]'
        }]
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".scss", ".json"],
    },
// devServer: {
//     contentBase: '/',
//     host: 'localhost',
//     port: 80,
//     inline: true,
// },
};

export default config;

