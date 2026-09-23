'use strict';
const worlds = [
  {name:'CUENCA',place:'AZUAY / THE NEW CATHEDRAL',image:'cuenca-source.webp?v=2',alt:'The blue domes of the New Cathedral amid Cuenca’s historic architecture',detail:'Historic courtyards, workshops and houses. Familiar architecture gives the first impossible door a believable beginning.'},
  {name:'GUAYAQUIL',place:'GUAYAS / LAS PEÑAS',image:'guayaquil-source.webp?v=2',alt:'Colorful timber façades and a cobbled pedestrian street in Las Peñas',detail:'Colorful timber façades, narrow routes and tropical light. A radically different city on the other side of a threshold.'},
  {name:'ANDES',place:'COTOPAXI / LIMPIOPUNGO',image:'andes-source.webp?v=2',alt:'Snow-covered Cotopaxi above Laguna de Limpiopungo',detail:'Volcanoes, páramo and open horizons. Refuges and rural structures can connect domestic interiors to an immense landscape.'},
  {name:'AMAZONÍA',place:'TÁLAG / PIMPILALA WATERFALL',image:'amazon-falls.webp?v=2',alt:'Pimpilala waterfall surrounded by dense green vegetation in Tálag, Ecuador',detail:'Water, humidity and dense vegetation transform the feeling of space. Tena and Puyo are part of the proposed scouting direction.'},
  {name:'PACIFIC',place:'MANABÍ / LOS FRAILES',image:'pacific-source.webp?v=2',alt:'Turquoise Pacific water, pale beaches and dry coastal vegetation at Los Frailes',detail:'Dry forest gives way to pale sand and turquoise water. Coastal settlements introduce another architectural and climatic rhythm.'},
  {name:'GALÁPAGOS',place:'BARTOLOMÉ / PINNACLE ROCK',image:'galapagos-source.webp?v=2',alt:'Pinnacle Rock and the beach on Bartolomé Island in Galápagos',detail:'Volcanic rock, ocean and insular life. An entirely different world, still within the same country.'}
];
const atlas=document.querySelector('#world-atlas');
atlas.innerHTML=worlds.map((w,i)=>`<article class="world-card"><div class="world-photo"><img src="assets/${w.image}" alt="${w.alt}" loading="lazy" decoding="async"><span class="world-number">${String(i+1).padStart(2,'0')} / ECUADOR</span></div><h3>${w.name}</h3><span class="world-meta">${w.place}</span><p>${w.detail}</p></article>`).join('');
const chapters=[
 {title:'CAPTURING ECUADOR',body:'Planned field notes: scouting architecture and thresholds, securing capture access, photographing spaces and documenting their context.'},
 {title:'BUILDING REALITY',body:'Planned reconstruction studies: compare visual fidelity, spatial coverage and asset performance. Document the path from images to a usable environment.'},
 {title:'THE FIRST DOOR',body:'Planned interaction tests: connect two captured places through a believable architectural threshold and evaluate continuity of movement.'},
 {title:'BREAKING GRAVITY',body:'Planned spatial experiments: test local orientation, player navigation and the clarity of transitions between gravity frames.'},
 {title:'PEOPLE IN 4D',body:'Planned research: capture human performances and evaluate their visual quality, playback and integration into the environment.'},
 {title:'IMPOSSIBLE GEOGRAPHY',body:'Planned level studies: combine locations into a coherent route, introduce repeatable door rules, and observe how players learn them.'},
 {title:'FINDING THE WAY HOME',body:'Planned prototype report: document the complete puzzle, player feedback, performance work and the polished demonstration.'}
];
const journal=document.querySelector('#journal-list');
for(const [i,chapter] of chapters.entries()){
 const entry=document.createElement('details');entry.className='journal-entry';
 const summary=document.createElement('summary');summary.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><strong>${chapter.title}</strong><small>PLANNED CHAPTER</small>`;
 const body=document.createElement('p');body.textContent=chapter.body;entry.append(summary,body);journal.append(entry);
}
document.querySelector('#year').textContent=new Date().getFullYear();

// Narrative frames follow the currently readable step. On narrow screens the scene stays above the text.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const steps=[...document.querySelectorAll('.walk-step')];
const scene=document.querySelector('.walk-scene');
const frames=[...document.querySelectorAll('.scene-image')];
const dots=[...document.querySelectorAll('.scene-dots i')];
const sceneData=[
 ['START / CUENCA','A FAMILIAR PLACE. AN ORDINARY DOOR.'],
 ['FIRST CROSSING / AMAZONÍA','YOU CROSSED. YOU ARE SOMEWHERE ELSE.'],
 ['ATTEMPTED RETURN / ANOTHER ORIENTATION','YOU TRIED TO RETURN. THE PREVIOUS PLACE IS GONE.'],
 ['ANOTHER CROSSING / ALTERED SCALE','THE WORLD IS REAL. YOUR SCALE HAS CHANGED.']
];
let currentStep=-1,doorTimer;
function showStep(index){
 if(index===currentStep)return;
 const previous=currentStep;currentStep=index;scene.dataset.step=String(index);
 steps.forEach((el,i)=>el.classList.toggle('active',i===index));frames.forEach((el,i)=>{el.classList.toggle('active',i===index);el.setAttribute('aria-hidden',String(i!==index));});dots.forEach((el,i)=>el.classList.toggle('active',i===index));
 document.querySelector('#scene-place').textContent=sceneData[index][0];document.querySelector('#scene-route').textContent=sceneData[index][1];document.querySelector('#scene-count').textContent=`0${index+1} / 04`;
 clearTimeout(doorTimer);scene.classList.remove('opening');
 if(index===1&&previous===0&&!reduced.matches){scene.classList.add('opening');doorTimer=setTimeout(()=>scene.classList.remove('opening'),80);}
}
let scheduled=false;
function updateScroll(){
 const narrow=innerWidth<=700;const focus=innerHeight*(narrow?.78:.52);
 let nearest=0,distance=Infinity;
 steps.forEach((step,i)=>{const box=step.getBoundingClientRect();const d=Math.abs(box.top+box.height*.5-focus);if(d<distance){nearest=i;distance=d;}});
 showStep(nearest);
 const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=`${max>0?scrollY/max*100:0}%`;
 scheduled=false;
}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});addEventListener('resize',updateScroll);updateScroll();

// Replace either reserved canvas with a hosted film or playable experience via media.json.
fetch('media.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error('Media configuration unavailable');return r.json();}).then(config=>{
 for(const type of ['film','demo']){
 const item=config[type],canvas=document.querySelector(`[data-media="${type}"]`);if(!item?.src||!canvas)continue;
 const url=new URL(item.src,location.href);if(!['https:','http:'].includes(url.protocol))continue;
 if(item.type==='video'){
 const video=document.createElement('video');video.controls=true;video.preload='metadata';video.playsInline=true;video.poster=item.poster||'';video.setAttribute('aria-label',`${type==='film'?'Project film':'Prototype recording'} — Find Your Way Home`);
 const source=document.createElement('source');source.src=url.href;source.type=item.mime||'video/mp4';video.append(source);canvas.replaceChildren(video);
 }else if(item.type==='embed'){
 const frame=document.createElement('iframe');frame.src=url.href;frame.title=`Find Your Way Home ${type==='film'?'project film':'playable prototype'}`;frame.loading='lazy';frame.allow='fullscreen; autoplay; gamepad';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';canvas.replaceChildren(frame);
 }
 }
}).catch(()=>{/* Keep the visible production states if optional media is not configured. */});
