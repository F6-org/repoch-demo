import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import getIPAddress from './app/utils/getIpAddress';

const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const assetsDir = path.resolve(__dirname, 'build/h5');
export const localDev = false;
export const localIP = getIPAddress();
const jsPath = localDev ? '//' + localIP + ':3000/build/h5/' : '//js.t.sinajs.cn/c2p/purchase/wawa/h5/';

let config = {
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
        })
    ],
    postcss: function() {
        return [precss, autoprefixer];
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules[\\\/](?!wbpay-repoch)|wbpay-repoch.*node_modules/
        },
        //  {
        //     test: /\.jsx?$/,
        //     loaders: ['react-hot', 'babel'],
        //     exclude: [nodeModulesDir],
        //     include: path.join(__dirname)
        // },
         {
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
            loader: 'url?limit=100000@name=[name][ext]'
        }]
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".scss", ".json"],
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