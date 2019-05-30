module.exports = function (src, options) {
    options.data.root.context.bundleEntries.push(src);
};
