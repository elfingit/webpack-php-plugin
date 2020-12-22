import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';
import PhpPlugin from '../src/index'

export default (fixture, options = {}) => {
    const compiler = webpack({
        context: __dirname,
        entry: `./${fixture}`,
        output: {
            path: path.resolve(__dirname),
            filename: 'bundle.js',
        },
        plugins: [
            new PhpPlugin({
                files: [
                    'example.php'
                ],
                //dstDir: path.resolve(__dirname, 'dist'),
                srcDir: path.resolve(__dirname),
                vars: {
                    CLIENT_KEY: '343434',
                    SECRET: 'sdsd-fddfdf-67GG-JHGD'
                }
            })
        ]
    });

    compiler.outputFileSystem = new memoryfs();

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) reject(err);
            if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

            resolve(stats);
        });
    });
}

