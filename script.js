const worlds = [
  {number:'01',name:'CUENCA',region:'THE ANDES / AZUAY',detail:'The New Cathedral, historic streets, houses and the first ordinary door.',image:'cuenca-source.webp',alt:'Documentary photograph of the New Cathedral in Cuenca'},
  {number:'02',name:'GUAYAQUIL',region:'THE COAST / GUAYAS',detail:'Las Peñas. A different city, light and climate on the other side.',image:'guayaquil-source.webp',alt:'Colorful wooden houses on a cobblestone street in Las Peñas, Guayaquil'},
  {number:'03',name:'ANDES',region:'THE HIGHLANDS / COTOPAXI',detail:'Páramo, volcanic ground and a horizon that changes the scale of everything.',image:'andes-source.webp',alt:'Documentary photograph of Ecuadorian Andean páramo'},
  {number:'04',name:'AMAZON',region:'THE RAINFOREST / AMAZONÍA',detail:'A living river system, deep forest and the waterfall at Tálag.',image:'amazon-source.webp',secondary:'amazon-falls.webp',alt:'An Ecuadorian Amazon river flowing through dense rainforest'},
  {number:'05',name:'PACIFIC',region:'THE COAST / MANABÍ',detail:'Dry vegetation, ocean air and the wide edge of the continent.',image:'pacific-source.webp',alt:'Documentary photograph of the Ecuadorian Pacific coast'},
  {number:'06',name:'GALÁPAGOS',region:'THE ISLANDS / GALÁPAGOS',detail:'Lava, ocean and an isolated geography that feels like another planet.',image:'galapagos-source.webp',alt:'The beach and Pinnacle Rock on Bartolomé Island, Galápagos'}
];
const chapters=['CAPTURING ECUADOR','BUILDING REALITY','THE FIRST DOOR','BREAKING GRAVITY','PEOPLE IN 4D','IMPOSSIBLE GEOGRAPHY','FINDING THE WAY HOME'];
const sequence=document.querySelector('#world-sequence');
sequence.innerHTML=worlds.map(w=>`<article class="world-panel ${w.secondary ? 'world-amazon' : ''}"><img src="assets/${w.image}" alt="${w.alt}" loading="lazy">${w.secondary ? `<div class="world-inset"><img src="assets/${w.secondary}" alt="Pimpilala waterfall near Tálag, Ecuador" loading="lazy"><span>TÁLAG / A SECOND VIEW</span></div>` : ''}<span class="world-counter">${w.number} / 06</span><div class="world-panel-content"><div><span class="meta">${w.region} · DOCUMENTARY IMAGE</span><h3>${w.name}</h3></div><p>${w.detail}</p></div><span class="world-credit">A REAL PLACE / A POSSIBLE WORLD</span></article>`).join('');
document.querySelector('#journal-list').innerHTML=chapters.map((c,i)=>`<div class="journal-row"><span>${String(i+1).padStart(2,'0')}</span><strong>${c}</strong><small>CHAPTER IN DEVELOPMENT</small></div>`).join('');
document.querySelector('#year').textContent=new Date().getFullYear();

// Optional media can be connected by editing media.json. Until then the designed canvases remain intact.
fetch('media.json').then(r=>r.ok?r.json():{}).then(config=>{
  for(const type of ['film','demo']){
    const item=config[type],canvas=document.querySelector(`[data-media="${type}"]`);
    if(!item?.src||!canvas)continue;
    if(item.type==='video'){
      const video=document.createElement('video');video.controls=true;video.preload='metadata';video.playsInline=true;video.poster=item.poster||'';video.setAttribute('aria-label',type==='film'?'Find Your Way Home project film':'Playable prototype video');
      const source=document.createElement('source');source.src=item.src;source.type=item.mime||'video/mp4';video.append(source);canvas.replaceChildren(video);
    }else if(item.type==='embed'){
      const frame=document.createElement('iframe');frame.src=item.src;frame.title=type==='film'?'Find Your Way Home project film':'Find Your Way Home playable prototype';frame.loading='lazy';frame.allow='fullscreen; autoplay; gamepad';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';canvas.replaceChildren(frame);
    }
  }
}).catch(()=>{});
const mediaStyle=document.createElement('style');mediaStyle.textContent='.media-canvas>video,.media-canvas>iframe{display:block;width:100%;height:100%;border:0;object-fit:contain}';document.head.append(mediaStyle);

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('in-view',e.isIntersecting)),{threshold:.12});
document.querySelectorAll('.world-panel').forEach(el=>observer.observe(el));
if(!reduced){
  const door=document.querySelector('.first-door'),after=document.querySelector('.door-after');
  const look=document.querySelector('.look-section'),lookImage=document.querySelector('.look-sticky img');
  const progress=document.querySelector('.progress');let ticking=false;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function update(){
    const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`;
    const d=door.getBoundingClientRect(),dp=clamp((-d.top)/(d.height-innerHeight),0,1);
    after.style.clipPath=`inset(0 ${50*(1-dp)}% 0 ${50*(1-dp)}%)`;
    const l=look.getBoundingClientRect(),lp=clamp((-l.top)/(l.height-innerHeight),0,1);
    lookImage.style.transform=`scale(${(1.2-.2*lp).toFixed(3)}) rotate(${((1-lp)*3).toFixed(2)}deg)`;
    ticking=false;
  }
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});addEventListener('resize',update);update();
}
