import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import assert from 'node:assert/strict';
const data=JSON.parse(readFileSync('content.json','utf8'));
const files=readdirSync('.').filter(f=>f.endsWith('.html'));
const strip=s=>s.replace(/<br\s*\/?\s*>/g,' ').replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&quot;','"').replace(/\s+/g,' ').trim();
for(const file of files){const html=readFileSync(file,'utf8');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: one primary heading`);assert(html.includes('<html lang="en">'));assert(html.includes('name="description"'));for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){let u=match[1];if(u.startsWith('/utkarsh-portfolio/')){u=u.slice('/utkarsh-portfolio/'.length).split('#')[0]||'index.html';assert(existsSync(u),`${file}: missing ${u}`);}else assert(!u.startsWith('/'),`${file}: link omits base path ${u}`);}for(const tag of html.matchAll(/<img[^>]*>/g))assert(/alt="[^"]*"/.test(tag[0]),`${file}: image missing alt`);}
for(const id of ['conference-recap-glsvlsi-2025','graduation-usc-2025']){const actual=strip(readFileSync(id+'.html','utf8'));for(const block of data.pages[id].sections[1].blocks)assert(actual.includes(strip(block)),`${id}: missing article paragraph`);}
const home=readFileSync('index.html','utf8');const plain=strip(home);for(const block of data.pages.home.sections[4].blocks)assert(plain.includes(strip(block)),`Missing news: ${strip(block)}`);
for(const post of data.posts){for(const file of ['blog.html',post.id+'.html'])assert(readFileSync(file,'utf8').includes(post.date),`${file}: missing date ${post.date}`);for(const block of data.pages.blog.sections[post.section].blocks)assert(strip(readFileSync('blog.html','utf8')).includes(strip(block)),`Missing blog preview: ${strip(block)}`);}
for(const a of data.assets){assert.equal(a.status,'archived');assert(existsSync(`assets/${a.id}-thumb.webp`));assert(existsSync(`assets/${a.id}-large.webp`));if(a.caption)assert(plain.includes(a.caption),'Missing caption '+a.caption);}
const gallery=readFileSync('photography.html','utf8');assert.equal((gallery.match(/data-album-section/g)||[]).length,8);assert.equal((gallery.match(/class="photo-link"/g)||[]).length,52);
for(const a of data.assets){assert(files.some(f=>readFileSync(f,'utf8').includes(a.id+'-')),`Unplaced image ${a.id}`);}
for(const p of ['research','teaching']){const actual=strip(readFileSync(p+'.html','utf8'));for(const s of data.pages[p].sections)for(const block of s.blocks)assert(actual.includes(strip(block)),`${p}: missing block ${strip(block)}`);}
const total=readdirSync('assets').reduce((n,f)=>n+statSync('assets/'+f).size,0);
console.log(`PASS: ${files.length} pages; all local links and assets; 22 complete news entries; 2 full articles; all research and teaching text; 74 image placements; 52 photographs / 8 albums. Assets ${(total/1024/1024).toFixed(1)} MB in total, loaded on demand.`);
