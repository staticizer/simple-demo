module.exports = {
    args: [
        {
            name: 'prop_a',
            type: String,
            default: '(default a)',
            kwarg: true
        },
        {
            name: 'prop_b',
            type: String,
            default: '(default b)',
            kwarg: true
        }
    ],

    data(data) {
        data.additional = 'From data function';
        return data;
    }
};
