const fs = require('fs');
const Handlebars = require('handlebars');
const SzComponent = require('./SzComponent');

function loadComponent({
    filename,
    filepath
}) {

    const componentName = filename.replace(/\.hbs$/, '');
    const pathWithoutExtension = filepath.replace(/\.hbs$/, '');

    const templateContent = fs.readFileSync(filepath, { encoding: 'utf-8' });

    const classFilepath = pathWithoutExtension + '.js';

    let component = null;

    if (fs.existsSync(classFilepath) && !fs.statSync(classFilepath).isDirectory()) {
        component = require(classFilepath);
        if (!component.name) component.name = componentName;
    } else {
        component = new SzComponent({ name: componentName });
    }

    component.setTemplate(Handlebars.compile(templateContent));
    component.registerHelper();

    return componentName;
}

module.exports = {
    loadComponent
};
