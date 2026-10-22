const fs = require('node:fs');
const path = require('node:path');
require('./generate-projects.cjs');
const destination = path.resolve(__dirname, 'dist');
if (path.dirname(destination) !== path.resolve(__dirname) || path.basename(destination) !== 'dist') throw Error('Invalid publish directory');
// Remove stale files from this specific build output only.
fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination);
function copy(relative) {
  const source = path.resolve(__dirname, relative);
  if (!source.startsWith(path.resolve(__dirname) + path.sep)) throw Error('Asset outside project');
  let cursor = source;
  while (cursor !== path.resolve(__dirname)) {
    if (fs.lstatSync(cursor).isSymbolicLink()) throw Error('Symbolic links are not publishable');
    cursor = path.dirname(cursor);
  }
  const target = path.join(destination, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}
for (const file of ['index.html', 'style.css', 'design.css', 'layout.css', 'theme.css', 'projects-data.js', 'script.js']) copy(file);
// Publish only assets actually referenced by visible albums.
const context = { window: {} };
require('node:vm').runInNewContext(fs.readFileSync(path.join(__dirname, 'projects-data.js'), 'utf8'), context);
const assets = new Set(['image/รูปหน้าปก.jpg', 'image/line-qr.png', 'logo/Logo.png']);
for (const project of context.window.CPN_PROJECTS) for (const image of project.images) assets.add(decodeURIComponent(image));
for (const asset of assets) copy(asset);
for (const file of fs.readdirSync(path.join(__dirname, 'fonts'))) {
  if (/\.(ttf|woff2?|otf)$/i.test(file) || file === 'OFL.txt') copy(path.join('fonts', file));
}
console.log('Static website prepared in dist/ (published assets only)');
