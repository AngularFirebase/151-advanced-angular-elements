const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/elements/runtime.js',
    './dist/elements/polyfills.js',
    './dist/elements/scripts.js',
    './dist/elements/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'public/elements.js');
})();