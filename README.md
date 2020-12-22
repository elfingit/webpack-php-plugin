## Example Wepback config
```javascript
const PhpPlugin = require('webpack-php-plugin')

module.exports = {
    entry: {
        ...
    },
    output: {
        ...    
    },
    module: {
        ...
    }
    plugins: [
        new PhpPlugin({
            files: [
                'test.php'
            ],
            srcDir: path.resolve(__dirname, 'src'),
            vars: {
                CLIENT_KEY: process.env.CLIENT_KEY,
                SECRET: process.env.SECRET,
                CLIENT_ID: process.env.CLIENT_ID
            }
        })
    ]
};
```

## Example PHP file
```php
<?php

$clientKey = '{CLIENT_KEY}';
$anotherVar = '{CLIENT_KEY}';
$clientID = {CLIENT_ID};

$secret = '{SECRET}';

```
