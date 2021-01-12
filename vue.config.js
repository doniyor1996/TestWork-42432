const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
	publicPath: '/',
    configureWebpack: {
        entry: './resources/js/main.js'
    },
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
	},
    outputDir: 'public',
    assetsDir: 'assets',
	devServer: {
		port: 9999,

	},
	runtimeCompiler: true
};
