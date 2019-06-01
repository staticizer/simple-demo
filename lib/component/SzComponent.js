const Handlebars = require('handlebars');

function checkArg(componentName, val, spec, name = spec.name) {
    if (val === void 0) {
        if (spec.required) {
            throw new ReferenceError(`${name} argument of ${componentName} is required`);
        } else {
            if (typeof spec.default === typeof Function) return spec.default();
            return spec.default;
        }
    } else {
        if (spec.type) {
            let passed = false;
            if (spec.type === Number) passed = typeof val === typeof 0;
            else if (spec.type === String) passed = typeof val === typeof '';
            else if (spec.type === Boolean) passed = typeof val === typeof true;
            else if (spec.type === Object) passed = (val instanceof Object);
            else if (spec.type === Array) passed = (Array.isArray(type));
            else {
                throw new TypeError(`Unknown type of ${name} argument in ${componentName}`);
            }

            if (!passed) {
                throw new TypeError(
                    `${name} argument of ${componentName}: expected ${spec.type.name}, got ${val}`
                );
            }
        }
        return val;
    }
}

module.exports = class SzComponent {
    constructor({
        name,
        args,
        kwargs
    } = {}) {
        this.name = name;
        this.args = args;
        this.kwargs = kwargs;
        this.templateFn = null;
    }

    registerHelper() {
        const component = this;
        Handlebars.registerHelper(component.name, function(...args) {
            const options = args.pop();
            const kwargs = options.hash;

            return component.render(component.createDataObject(args, kwargs));
        });
    }

    createDataObject(args, kwargs) {
        const data = {};
        for (let i = 0; i < this.args.length; i++) {
            const argSpec = this.args[i];
            let argVal = args[i];

            if (argVal === void 0 && argSpec.kwarg) {
                argVal = kwargs[argSpec.kwarg];
            }

            data[argSpec.name] = checkArg(this.name, argVal, argSpec);
        }

        for (let argName in this.kwargs) {
            const argSpec = this.kwargs[argName];
            const argVal = kwargs[argName];
            data[argName] = checkArg(this.name, argVal, argSpec, argName);
        }

        return data;
    }

    render(data) {
        if (!this.templateFn)
            throw new ReferenceError(`Template is not defined for ${this.name} component`);
        return new Handlebars.SafeString(this.templateFn(data));
    }
    setTemplate(templateFn) {
        this.templateFn = templateFn;
    }
};
