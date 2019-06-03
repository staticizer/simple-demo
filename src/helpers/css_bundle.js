const Handlebars = require('handlebars');

module.exports = function cssBundle(options) {
    const { pagePath, pageName } = options.data.root;
    return new Handlebars.SafeString(
        `<!-- SZ_CSS_BUNDLE(${pagePath.concat([pageName]).join('/')}) -->`
    );
};
