/* eslint no-var:0 */
/* eslint no-console:0 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config, {localIP, localDev} from './webpack.dev.reload.config';

const server = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	disableHostCheck: true,
	compress: true,
	proxy: {
		// "**": "http://js.t.sinajs.cn"
	},
	headers: {"Access-Control-Allow-Origin": "*"},
	headers: {"Access-Control-Allow-Credentials": "true"}
});
if (localDev) {
	server.listen(3000, (err) => {
		if (err) {
			console.log(err);
		}
		console.log('Listening at http://' + localIP + ':3000');
	});
} else {
	server.listen(80, (err) => {
		if (err) {
			console.log(err);
		}
		console.log('Listening at http://js.t.sinajs.cn');
	});
}