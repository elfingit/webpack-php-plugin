const fs = require('fs')

class PhpPlugin {
    constructor(options) {
        const userOptions = options || {};

        const defaultOptions = {
            files: [],
            vars: {}
        }

        this.options = Object.assign(defaultOptions, userOptions);
    }

    apply(compiler) {
        const self = this;
        const files = this.options.files;

        compiler.hooks.emit.tapAsync({
            name: 'PHP Plugin',
            context: true
        }, (context, compiler, callback) => {
            const reportProgress = context && context.reportProgress;
            if (reportProgress) reportProgress(0.95, 'Starting work');
        });
    }
}
