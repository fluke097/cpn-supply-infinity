'use strict';
const categories = {
  Power: {name:'งานติดตั้งระบบไฟฟ้า',label:'ELECTRICAL SYSTEM',files:['347359_0','347360_0','347362_0','347366_0','348305_0','348310_0','348311_0','348312_0','348313_0']},
  Air: {name:'งานระบบเครื่องปรับอากาศ',label:'AIR CONDITIONING',files:Array.from({length:14},(_,i)=>`${348339+i}_0`)},
  Sola: {name:'งานติดตั้งโซลาร์เซลล์',label:'SOLAR ENERGY',files:Array.from({length:5},(_,i)=>`${348299+i}_0`)},
  Firefighting: {name:'งานระบบดับเพลิง',label:'FIRE PROTECTION',files:['344759_0','344760_0','344762_0','344763_0','348316_0','348318_0','348319_0','348322_0','348323_0','348324_0','348325']},
  Test_power: {name:'งานตรวจสอบระบบไฟฟ้า',label:'ELECTRICAL INSPECTION',files:Array.from({length:10},(_,i)=>`${348328+i}_0`)}
};
// Interleave categories so the first view shows the range of actual work.
const projects=[];
for(let i=0;i<14;i++) for(const [category,info] of Object.entries(categories)) if(info.files[i]) projects.push({category,src:`image/${category}/${info.files[i]}.jpg`,name:info.name,label:info.label,number:i+1});
let filter='all',limit=6,currentImage=0;
const grid=document.querySelector('#project-grid');
const lightbox=document.querySelector('#lightbox');
const matching=()=>projects.filter(p=>filter==='all'||p.category===filter);
function render(){
  const items=matching();grid.replaceChildren();
  items.slice(0,limit).forEach((project,index)=>{
    const card=document.createElement('button');card.type='button';card.className='project-card';card.setAttribute('aria-label',`ดูภาพ ${project.name} ${project.number}`);
    card.innerHTML=`<div class="project-photo"><img src="${project.src}" alt="${project.name} ภาพที่ ${project.number}" loading="lazy"><span aria-hidden="true">↗</span></div><div class="project-info"><small>${project.label}</small><h3>${project.name}</h3><p>ภาพผลงานจริง · ${String(project.number).padStart(2,'0')}</p></div>`;
    card.addEventListener('click',()=>{currentImage=index;updateImage();lightbox.showModal()});grid.append(card);
  });
  document.querySelector('#project-count').textContent=`แสดง ${Math.min(limit,items.length)} จาก ${items.length} ภาพผลงาน`;
  document.querySelector('#load-more').hidden=limit>=items.length;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter;limit=6;
  document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});render();
}));
document.querySelector('#load-more').addEventListener('click',()=>{limit+=6;render()});
function updateImage(){const items=matching();currentImage=(currentImage+items.length)%items.length;const p=items[currentImage];const img=document.querySelector('#lightbox-image');img.src=p.src;img.alt=`${p.name} ภาพที่ ${p.number}`;document.querySelector('#lightbox-caption').textContent=`${p.name} · ${currentImage+1} / ${items.length}`}
document.querySelector('.close-lightbox').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close()}});
document.querySelector('#prev-image').addEventListener('click',()=>{currentImage--;updateImage()});
document.querySelector('#next-image').addEventListener('click',()=>{currentImage++;updateImage()});
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){currentImage++;updateImage()}if(e.key==='ArrowLeft'){currentImage--;updateImage()}});
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'ปิดเมนู':'เปิดเมนู');toggle.textContent=open?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','เปิดเมนู');toggle.textContent='☰'}));
document.querySelector('#copy-line').addEventListener('click',async()=>{
  const status=document.querySelector('#copy-status');
  try{await navigator.clipboard.writeText('Test.System');status.textContent='คัดลอก LINE ID แล้ว: Test.System'}catch{status.textContent='LINE ID: Test.System — เลือกข้อความเพื่อคัดลอก';const range=document.createRange();range.selectNodeContents(document.querySelector('.line-row strong'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range)}
});
document.querySelector('#year').textContent=new Date().getFullYear();render();

