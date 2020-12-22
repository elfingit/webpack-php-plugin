/**
 * @jest-environment node
 */

import compiler from "./compiler";

test('Process PHP file', async() => {
    const stats = await compiler('example.js');
    const output = stats.compilation.assets['example.php'].source();

    console.log();

    expect(output).toBe("<?php\n" +
        "\n" +
        "$clientKey = '343434';\n" +
        "$anotherVar = '343434';\n" +
        "\n" +
        "$secret = 'sdsd-fddfdf-67GG-JHGD'" +
        "\n");
}, 30000);
