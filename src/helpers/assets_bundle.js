module.exports = function (options) {
    const { pagePath, pageName } = options.data.root;
    return `<script src="/assets/${pagePath.concat([pageName]).join('/')}.js"></script>`;
};
