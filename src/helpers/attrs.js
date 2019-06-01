const Handlebars = require('handlebars');

module.exports = function attrs(...args) {
    const kwargs = args.pop().hash;
    const attrsObj = Object.assign({}, ...args, kwargs);
    const result = Object.keys(attrsObj)
        .map(attrName => `${attrName}="${attrsObj[attrName]}"`)
        .join(' ');
    return new Handlebars.SafeString(result);
}
