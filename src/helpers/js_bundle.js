const Handlebars = require('handlebars');

module.exports = function jsBundle(options) {
    const { pagePath, pageName } = options.data.root;
    return new Handlebars.SafeString(
        `<script src="/assets/${pagePath.concat([pageName]).join('/')}.js"></script>`
    );
};
