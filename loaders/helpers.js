const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

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

function stringifyLayoutsDict(layouts) {
    const entries = [];
    for (let name in layouts) {
        entries.push(`"${name}":${layouts[name]}`);
    }
    return `{${entries.join(',')}}`;
}
function loadLayouts(dirname) {
    const layouts = {};

    const filenames = fs.readdirSync(dirname);
    for (let i = 0; i < filenames.length; i++) {
        const filepath = path.resolve(dirname, filenames[i]);
        if (!fs.statSync(filepath).isDirectory()) {
            const [, name] = filenames[i].match(/(.+)\.hbs$/) || [];
            const template = fs.readFileSync(filepath, { encoding: 'utf-8' });
            const precompiled = Handlebars.precompile(template);
            layouts[name] = precompiled;
        }
    }

    return stringifyLayoutsDict(layouts);
}

module.exports = {
    loadHelpers,
    loadLayouts,
    tree
};
