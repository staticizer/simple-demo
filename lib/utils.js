const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { loadComponent } = require('./component');

function tree(dirname, fn) {
    const filenames = fs.readdirSync(dirname);
    for (let i = 0; i < filenames.length; i++) {
        const filepath = path.resolve(dirname, filenames[i]);
        if (fs.statSync(filepath).isDirectory()) {
            tree(filepath, fn);
        } else {
            fn({
                filepath,
                name: filenames[i],
                dirname
            });
        }
    }
}

function loadHelpers(dirname) {
    tree(dirname, file => {
        const fn = require(file.filepath);
        const [, name] = file.name.match(/(.+)\.js$/) || [];
        if (name) {
            Handlebars.registerHelper(name, fn);
        }
    });
}

function loadComponents(dirname) {
    tree(dirname, file => {
        if (file.name.endsWith('.hbs')) {
            const name = loadComponent({
                filename: file.name,
                filepath: file.filepath
            });
            console.log(`Loaded ${name} from ${file.filepath}`);
        }
    });
}

module.exports = {
    loadHelpers,
    loadComponents,
    tree
};
