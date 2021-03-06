const { SzComponent } = require('staticizer');

class InputField extends SzComponent {
    render(data) {
        const attributes = {
            type: data.type
        };
        if (data.label) { attributes.label = data.label; }
        if (data.placeholder) { attributes.placeholder = data.placeholder; }

        return super.render({
            ...data,
            attributes
        });
    }
}

module.exports = new InputField({
    // name: 'InputField', // if not given, file name will be used
    args: [
        {
            name: 'type',
            type: String,
            default: 'text',
            kwarg: 'type'
        }
    ],
    kwargs: {
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        }
    },

    assets: [
        './InputField.client.js',
        './InputField.styl'
    ]
});
