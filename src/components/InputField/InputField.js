// const SzComponent = require('staticizer/SzComponent');
const SzComponent = require('../../../lib/component/SzComponent');

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
    name: 'InputField', // explicit
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

    bundle: [
        './InputField.client.js',
        './InputField.styl'
    ]
});
