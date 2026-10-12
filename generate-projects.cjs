const fs = require('node:fs');
const path = require('node:path');
const categories = {Power:['งานติดตั้งระบบไฟฟ้า','ELECTRICAL SYSTEM'],Air:['งานระบบเครื่องปรับอากาศ','AIR CONDITIONING'],Sola:['งานติดตั้งโซลาร์เซลล์','SOLAR ENERGY'],Firefighting:['งานระบบดับเพลิง','FIRE PROTECTION'],Test_power:['งานตรวจสอบระบบไฟฟ้า','ELECTRICAL INSPECTION'],CCTV:['งานกล้องวงจรปิด','CCTV & SECURITY']};
const collator = new Intl.Collator('th',{numeric:true});
const isImage = name => /\.(jpe?g|png|webp|avif)$/i.test(name);
function images(dir){return fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>collator.compare(a.name,b.name)).flatMap(entry=>entry.isDirectory()?images(path.join(dir,entry.name)):isImage(entry.name)?[path.join(dir,entry.name)]:[])}
const groups=[];
for(const [category,[name,label]] of Object.entries(categories)){
  const dir=path.join(__dirname,'image',category);if(!fs.existsSync(dir))continue;
  const jobs=fs.readdirSync(dir,{withFileTypes:true}).filter(e=>e.isDirectory()).sort((a,b)=>collator.compare(a.name,b.name));
  const items=[];
  for(const job of jobs){const folder=path.join(dir,job.name);const metaPath=path.join(folder,'project.json');const meta=fs.existsSync(metaPath)?JSON.parse(fs.readFileSync(metaPath,'utf8')):{};if(meta.published===false)continue;const files=images(folder);if(!files.length)continue;const urls=files.map(file=>path.relative(__dirname,file).split(path.sep).map(encodeURIComponent).join('/'));const cover=meta.cover?files.findIndex(f=>path.relative(folder,f).replaceAll('\\','/')===meta.cover):-1;
    items.push({id:category+'/'+job.name,category,name,label,title:meta.title||job.name,description:meta.description||name,cover:urls[cover<0?0:cover],images:urls});}
  groups.push(items);
}
const projects=[];for(let i=0;i<Math.max(0,...groups.map(g=>g.length));i++)for(const group of groups)if(group[i])projects.push(group[i]);
fs.writeFileSync(path.join(__dirname,'projects-data.js'),'window.CPN_PROJECTS = '+JSON.stringify(projects,null,2)+';\n');
console.log(`Generated ${projects.length} projects / ${projects.reduce((n,p)=>n+p.images.length,0)} images`);
