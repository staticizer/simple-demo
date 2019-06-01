module.exports = function bundle(src, options) {
    options.data.root.context.bundleEntries.push(src);
};
