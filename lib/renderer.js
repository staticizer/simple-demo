const Handlebars = require('handlebars/runtime');
const helpersContext = require.context('helpers', false, /\.js$/);
helpersContext.keys().forEach(
    filename => Handlebars.registerHelper(filename.replace(/^\.\/(.+)\.js$/, '$1'), helpersContext(filename))
);

module.exports = function renderPage({
    data,
    layouts,
    pageBody,
    defaultData
}) {
    console.log(data.htmlWebpackPlugin.files);

    const templateData = { ...defaultData, ...data };
    const compiledBody = Handlebars.template(pageBody)(templateData);
    const layoutName = templateData.context.layout;
    templateData.body = compiledBody;
    return Handlebars.template(layouts[layoutName])(templateData);
};
