const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const {
    loadHelpers,
    loadLayouts
} = require('./helpers');

let helpersLoaded = false;

module.exports = function (pageTemplate) {
    const helpersPath = path.resolve(this.rootContext, 'helpers');
    const layoutsPath = path.resolve(this.rootContext, 'layouts');
    if (!helpersLoaded) {
        loadHelpers(helpersPath);
        helpersLoaded = true;
    }
    this.addContextDependency(helpersPath);

    const layouts = loadLayouts(layoutsPath);
    this.addContextDependency(layoutsPath);

    const match = this.context.match(new RegExp(`^${this.rootContext}/pages/(.+)$`));
    let pagePath = [];
    if (match) {
        pagePath = match[1].split('/');
    }

    const pageName = this.resourcePath.match(/\/([^/]+)\.hbs$/)[1];

    const defaultData = {
        meta: {
            title: 'Title'
        },
        context: {
            layout: 'default'
        },

        pagePath,
        pageName
    };

    const pageBody = Handlebars.precompile(pageTemplate);
    // const callback = this.async();

    return `
        const renderer = require('staticizer/renderer');

        module.exports = data => renderer({
            data,
            layouts: ${layouts},
            pageBody: ${pageBody},
            defaultData: ${JSON.stringify(defaultData)}
        });
    `;

    // fs.readFile(layoutPath, { encoding: 'utf-8' }, (err, layoutContent) => {
    //     if (err) {
    //         this.emitError(err);
    //         callback(err, null);
    //         return;
    //     }
    //     const layoutPrecompiled = Handlebars.precompile(layoutContent);
    //     callback(null, `module.exports = () => ${JSON.stringify(layoutBody)}`);
    // });
};
