const themeButton=document.querySelector('#theme-toggle');
themeButton.hidden=false;
function updateThemeLabel(){const dark=document.documentElement.dataset.theme==='dark'||(!document.documentElement.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches);themeButton.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} theme`);themeButton.setAttribute('aria-pressed',String(dark));}
updateThemeLabel();
themeButton.addEventListener('click',()=>{const dark=themeButton.getAttribute('aria-pressed')==='true';document.documentElement.dataset.theme=dark?'light':'dark';try{localStorage.setItem('um-theme',dark?'light':'dark');}catch{}updateThemeLabel();});
const mobileMenu=document.querySelector('.mobile-menu');
mobileMenu.addEventListener('keydown',e=>{if(e.key==='Escape'){mobileMenu.open=false;mobileMenu.querySelector('summary').focus();}});
document.addEventListener('click',e=>{if(!mobileMenu.contains(e.target))mobileMenu.open=false;});
const news=document.querySelector('.news-archive');
news?.addEventListener('toggle',()=>{news.querySelector('summary span').textContent=news.open?'Hide older updates':'View all updates';});
const albumLinks=[...document.querySelectorAll('[data-album]')];
const albumSections=[...document.querySelectorAll('[data-album-section]')];
function selectAlbum(id){if(id!=='all'&&!albumSections.some(s=>s.id===id))return;albumSections.forEach(s=>s.hidden=id!=='all'&&s.id!==id);albumLinks.forEach(a=>{if(a.dataset.album===id)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}
albumLinks.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();selectAlbum(a.dataset.album);history.replaceState(null,'',a.getAttribute('href'));}));
if(albumLinks.length&&location.hash)selectAlbum(location.hash.slice(1)==='all-albums'?'all':location.hash.slice(1));
window.addEventListener('hashchange',()=>{if(albumLinks.length)selectAlbum(location.hash.slice(1)==='all-albums'?'all':location.hash.slice(1));});
const dialog=document.querySelector('#lightbox');
const lightboxImage=document.querySelector('#lightbox-image');
let current=[],index=0,opener;
function showImage(){const link=current[index];const source=link.querySelector('img');lightboxImage.src=link.href;lightboxImage.alt=source.alt;document.querySelector('#lightbox-title').textContent=link.dataset.gallery;document.querySelector('#lightbox-caption').textContent=link.dataset.caption||source.alt;document.querySelector('#lightbox-count').textContent=`${index+1} / ${current.length}`;}
function move(delta){index=(index+delta+current.length)%current.length;showImage();}
if(typeof dialog.showModal==='function'){
 document.querySelectorAll('[data-gallery]').forEach(link=>link.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();opener=link;current=[...document.querySelectorAll('[data-gallery]')].filter(a=>a.dataset.gallery===link.dataset.gallery);index=current.indexOf(link);showImage();dialog.showModal();document.body.classList.add('modal-open');document.querySelector('#lightbox-close').focus();}));
 document.querySelector('#lightbox-close').addEventListener('click',()=>dialog.close());
 document.querySelector('#lightbox-prev').addEventListener('click',()=>move(-1));
 document.querySelector('#lightbox-next').addEventListener('click',()=>move(1));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='ArrowRight'){e.preventDefault();move(1);}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
}
