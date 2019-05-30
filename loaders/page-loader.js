const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const {
    loadHelpers
} = require('./helpers');

let helpersLoaded = false;

module.exports = function (pageTemplate) {
    const helpersPath = path.resolve(this.rootContext, 'helpers');
    if (!helpersLoaded) {
        loadHelpers(helpersPath);
        helpersLoaded = true;
    }
    this.addContextDependency(helpersPath);

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
            layout: 'default'
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
        const layoutBody = Handlebars.compile(layoutContent)({
            ...data,
            body: pageBody
        });
        callback(null, `module.exports = () => ${JSON.stringify(layoutBody)}`);
    });
};
