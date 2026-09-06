import http from 'node:http';
import {readFileSync,existsSync,statSync} from 'node:fs';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
const base='/utkarsh-portfolio/';
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json'};
http.createServer((req,res)=>{let url=new URL(req.url,'http://localhost');if(url.pathname==='/'){res.writeHead(302,{Location:base});return res.end();}if(!url.pathname.startsWith(base)){res.writeHead(404);return res.end('Not found');}let relative=decodeURIComponent(url.pathname.slice(base.length))||'index.html';let file=path.resolve(root,relative);if(!file.startsWith(path.resolve(root)+path.sep)||!existsSync(file)||!statSync(file).isFile()){res.writeHead(404,{'Content-Type':'text/html'});return res.end(readFileSync(path.join(root,'404.html')));}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(readFileSync(file));}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/utkarsh-portfolio/'));
