const fs = require('node:fs');
const path = require('node:path');
const destination = path.join(__dirname, 'dist');
fs.mkdirSync(destination, { recursive: true });
for (const file of ['index.html', 'style.css', 'design.css', 'layout.css', 'script.js']) {
  fs.copyFileSync(path.join(__dirname, file), path.join(destination, file));
}
for (const folder of ['image', 'fonts']) {
  fs.cpSync(path.join(__dirname, folder), path.join(destination, folder), { recursive: true });
}
console.log('Static website prepared in dist/');
