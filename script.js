'use strict';
const projects=window.CPN_PROJECTS||[];
let filter='all',limit=6,currentImage=0,currentProject=null;
const grid=document.querySelector('#project-grid'),lightbox=document.querySelector('#lightbox');
const matching=()=>projects.filter(p=>filter==='all'||p.category===filter);
function render(){
 const items=matching();grid.replaceChildren();
 for(const project of items.slice(0,limit)){
  const card=document.createElement('button');card.type='button';card.className='project-card';card.setAttribute('aria-label',`ดูอัลบั้ม ${project.name} ${project.title} ${project.images.length} ภาพ`);
  const photo=document.createElement('div');photo.className='project-photo';const image=document.createElement('img');image.src=project.cover;image.alt=`${project.name} ${project.title}`;image.loading='lazy';photo.append(image);
  const count=document.createElement('span');count.className='album-count';count.textContent=`${project.images.length} ภาพ`;photo.append(count);
  const info=document.createElement('div');info.className='project-info';const label=document.createElement('small');label.textContent=project.label;const title=document.createElement('h3');title.textContent=project.title;const description=document.createElement('p');description.textContent=project.description;const action=document.createElement('div');action.className='album-action';action.textContent='ชมอัลบั้มงาน';const arrow=document.createElement('span');arrow.textContent='↗';action.append(arrow);info.append(label,title,description,action);card.append(photo,info);
  card.addEventListener('click',()=>{currentProject=project;currentImage=0;renderThumbnails();updateImage();lightbox.showModal()});grid.append(card);
 }
 document.querySelector('#project-count').textContent=`แสดง ${Math.min(limit,items.length)} จาก ${items.length} งาน · ${items.reduce((n,p)=>n+p.images.length,0)} ภาพ`;
 document.querySelector('#load-more').hidden=limit>=items.length;
 if(!items.length){const empty=document.createElement('p');empty.className='album-empty';empty.textContent='ยังไม่มีผลงานในหมวดนี้';grid.append(empty)}
 document.querySelectorAll('[data-filter]').forEach(button=>{const total=projects.filter(p=>button.dataset.filter==='all'||p.category===button.dataset.filter).length;button.hidden=total===0;});
}
function renderThumbnails(){const strip=document.querySelector('#album-thumbnails');strip.replaceChildren();currentProject.images.forEach((src,index)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`ดูภาพที่ ${index+1}`);const img=document.createElement('img');img.src=src;img.alt='';img.loading='lazy';button.append(img);button.addEventListener('click',()=>{currentImage=index;updateImage()});strip.append(button)})}
function updateImage(){if(!currentProject)return;const items=currentProject.images;currentImage=(currentImage+items.length)%items.length;const img=document.querySelector('#lightbox-image');img.src=items[currentImage];img.alt=`${currentProject.name} ${currentProject.title} ภาพที่ ${currentImage+1}`;document.querySelector('#lightbox-caption').textContent=`${currentProject.title} · ${currentProject.name} · ${currentImage+1} / ${items.length}`;document.querySelectorAll('#album-thumbnails button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===currentImage)));document.querySelector('#prev-image').hidden=items.length<2;document.querySelector('#next-image').hidden=items.length<2;}
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;limit=6;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});render()}));
 document.querySelector('#load-more').addEventListener('click',()=>{limit+=6;render()});
 document.querySelector('.close-lightbox').addEventListener('click',()=>lightbox.close());
 lightbox.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close()}});
 document.querySelector('#prev-image').addEventListener('click',()=>{currentImage--;updateImage()});document.querySelector('#next-image').addEventListener('click',()=>{currentImage++;updateImage()});
 lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();currentImage++;updateImage()}if(e.key==='ArrowLeft'){e.preventDefault();currentImage--;updateImage()}});
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'ปิดเมนู':'เปิดเมนู');toggle.textContent=open?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','เปิดเมนู');toggle.textContent='☰'}));
document.querySelector('#year').textContent=new Date().getFullYear();render();


const lineContact=document.querySelector('#line-contact');
const mobileLine=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
if(mobileLine){lineContact.href='https://line.me/R/ti/p/%40900qsooq';lineContact.removeAttribute('target')} 
