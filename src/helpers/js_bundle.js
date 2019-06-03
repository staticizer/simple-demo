const Handlebars = require('handlebars');

module.exports = function jsBundle(options) {
    const { pagePath, pageName } = options.data.root;
    return new Handlebars.SafeString(
        `<!-- SZ_JS_BUNDLE(${pagePath.concat([pageName]).join('/')}) -->`
    );
};
