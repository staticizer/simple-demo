const Handlebars = require('handlebars');

module.exports = function cssBundle(options) {
    const { pagePath, pageName } = options.data.root;
    return new Handlebars.SafeString(
        `<link rel="stylesheet" href="/assets/${pagePath.concat([pageName]).join('/')}.css">`
    );
};
