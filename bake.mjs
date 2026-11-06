import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const project=path.dirname(fileURLToPath(import.meta.url));
const library=process.env.LEMO_OPUSCAR_HOME || path.resolve(project,'../lemo-opuscar');
const {chromium}=await import(pathToFileURL(path.join(library,'node_modules/playwright-core/index.mjs')));
const {serve}=await import(pathToFileURL(path.join(library,'core/render/serve.mjs')));
import fs from 'node:fs';
const {server,port}=await serve(project);
const b=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROME || '/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const p=await b.newPage();p.on('pageerror',e=>console.error(e));await p.goto(`http://127.0.0.1:${port}/make-assets.html`);await p.waitForFunction(()=>window.READY,{timeout:180000});const data=await p.evaluate(()=>window.ASSETS);for(const [n,url] of Object.entries(data)){fs.writeFileSync(path.join(project,`assets/${n}.png`),Buffer.from(url.split(',')[1],'base64'));console.log(n)}await b.close();server.close();
