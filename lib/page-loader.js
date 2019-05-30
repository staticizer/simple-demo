const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const {
    loadHelpers,
    loadLayouts
} = require('./utils');

module.exports = function (pageTemplate) {
    const helpersPath = path.resolve(this.rootContext, 'helpers');
    loadHelpers(helpersPath);
    this.addContextDependency(helpersPath);

    const layoutsPath = path.resolve(this.rootContext, 'layouts');
    const layouts = loadLayouts(layoutsPath);
    this.addContextDependency(layoutsPath);

    const match = this.context.match(new RegExp(`^${this.rootContext}/pages/(.+)$`));
    let pagePath = [];
    if (match) {
        pagePath = match[1].split('/');
    }

    const pageName = this.resourcePath.match(/\/([^/]+)\.hbs$/)[1];
    const pageBody = Handlebars.precompile(pageTemplate);
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

    return `
        const renderer = require('staticizer/renderer');

        module.exports = data => renderer({
            data,
            layouts: ${layouts},
            pageBody: ${pageBody},
            defaultData: ${JSON.stringify(defaultData)}
        });
    `;
};
