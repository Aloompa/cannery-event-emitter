const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
    	'cannery-event-emitter': './src'
    },
    output: {
    	path: path.resolve(__dirname) + '/dist',
    	filename: '[name].js',
    	sourceMapFilename: '[name].map'
    },
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=stage-0,presets[]=es2015'
    }],
    module: {
	  loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			include: /src/,
			query: {
                presets: ['es2015', 'stage-0']
            }
		}
    },
    plugings: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
