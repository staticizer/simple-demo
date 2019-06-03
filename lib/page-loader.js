const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const {
    loadHelpers,
    loadComponents
} = require('./utils');

module.exports = function (pageTemplate) {
    const helpersPath = path.resolve(this.rootContext, 'helpers');
    loadHelpers(helpersPath);
    this.addContextDependency(helpersPath);

    const componentsPath = path.resolve(this.rootContext, 'components');
    loadComponents(componentsPath);
    this.addContextDependency(componentsPath);

    const match = this.context.match(new RegExp(`^${this.rootContext}/pages/(.+)$`));
    let pagePath = [];
    if (match) {
        pagePath = match[1].split('/');
    }

    const pageName = this.resourcePath.match(/\/([^/]+)\.hbs$/)[1];

    const data = {
        meta: {
            title: 'Title'
        },
        context: {
            layout: 'default',
            bundleEntries: []
        },

        pagePath,
        pageName
    };

    const pageBody = Handlebars.compile(pageTemplate)(data);

    const layoutFile = data.context.layout + '.hbs';
    const layoutPath = path.resolve(this.rootContext, 'layouts', layoutFile);
    this.dependency(layoutPath);

    const callback = this.async();

    fs.readFile(layoutPath, { encoding: 'utf-8' }, (err, layoutContent) => {
        if (err) {
            this.emitError(err);
            callback(err, null);
            return;
        }

        const layoutData = {
            ...data,
            body: pageBody
        };
        const layoutBody = Handlebars.compile(layoutContent)(layoutData);

        // emit html
        // console.log(path.join(...pagePath, pageName + '.html'));
        this.emitFile(
            path.join(...pagePath, pageName + '.html'),
            layoutBody
        );

        const bundleEntries = layoutData.context.bundleEntries.map(
            assetPath => `require(${JSON.stringify(path.join('~/assets', assetPath))});`
        );

        callback(null, bundleEntries.join('\n'));
    });
};
