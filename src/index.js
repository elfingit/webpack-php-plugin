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
            name: 'PhpPlugin',
            context: true
        }, (context, compiler, callback) => {
            const reportProgress = context && context.reportProgress;
            if (reportProgress) reportProgress(0, 'Starting work');

            let promises = [];

            let step_progress = 100 / files.length;
            let step = 1;

            files.forEach((file) => {

                let srcFilePath = self.options.srcDir + '/' + file;
                //let dstFilePath = self.options.dstDir + '/' + file;
                let vars = self.options.vars

                promises.push(new Promise((resolve, reject) => {
                        fs.readFile(srcFilePath, (err, data) => {
                            if (err) return reject(err);

                            let content = data.toString('utf-8');

                            resolve(content)
                        });
                    }).then((content) => {
                        for (const [key, value] of Object.entries(vars)) {
                            content = content.split('{' + key + '}').join(value)
                        }

                        compiler.assets[file] = {
                            source: () => {
                                return content;
                            },
                            size: () => {
                                return content.length;
                            }
                        };

                    if (reportProgress) reportProgress(step * step_progress, 'Starting work');
                        step++;

                    }).catch((err) => {
                        throw err;
                    })
                );

                Promise.all(promises)
                    .then(() => {
                        callback();
                    })
                    .catch(err => {
                        throw err;
                    })
            });
        });
    }
}

module.exports = PhpPlugin;
