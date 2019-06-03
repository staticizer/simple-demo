const path = require('path');
const Handlebars = require('handlebars');

function addAssetToBundle(src, options) {
    options.data.root.context.bundleEntries[src] = true;
}

const builtinHelpers = {
    set_title(title, options) {
        options.data.root.meta.title = title;
    },

    bundle(src, options) {
        addAssetToBundle(path.join('assets', src), options);
    },
    css_bundle(options) {
        const { pagePath, pageName } = options.data.root;
        return new Handlebars.SafeString(
            `<!-- SZ_CSS_BUNDLE(${pagePath.concat([pageName]).join('/')}) -->`
        );
    },
    js_bundle(options) {
        const { pagePath, pageName } = options.data.root;
        return new Handlebars.SafeString(
            `<!-- SZ_JS_BUNDLE(${pagePath.concat([pageName]).join('/')}) -->`
        );
    }
};

module.exports = {
    register() {
        for (let helperName in builtinHelpers) {
            Handlebars.registerHelper(helperName, builtinHelpers[helperName]);
        }
    },

    addAssetToBundle
};
