const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: './app.ts',
    devtool: 'source-map',
    target: 'node',
    resolve: { extensions: ['.ts', '.js'] },
    optimization: {
        minimize: false
    },
    stats: { warnings: false },
    externals: [nodeExternals()],
    watchOptions: {
        ignored: ['/node_modules/'],
        aggregateTimeout: 300
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};
