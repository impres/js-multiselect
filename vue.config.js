module.exports = {
    chainWebpack: (config) => {
        // remove the old loader
        config.module.rules.delete('svg');

        // add the new one
        config.module.rule('svg')
            .test(/\.(svg)(\?.*)?$/)
            .use()
            .loader('url-loader')
            .options({
                limit: 16000,
                name: 'img/[name].[hash:8].[ext]',
            });
    },
};
