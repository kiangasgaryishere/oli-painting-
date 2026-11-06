import {Impasto} from './engine/impasto.js';
import {Ref,paintRef} from './engine/plate.js';
const W=800,H=1000,cv=document.createElement('canvas'),E=new Impasto(cv,{W,H,ss:2});
window.ASSETS={};
function bake(name,draw,solid=false){
 const r=new Ref(W,H,1);draw(r);
 const s=paintRef(r,{R:[30,16,8,4,2],T:19,seed:83});
 E.begin([.13,.1,.12]);E.under(E.texture(r.ctx.canvas),W,H,{grey:0});E.draw(E.batch(s.data()),{grey:0,run:.04,wet:.35});E.finish({vig:0,ground:[.13,.1,.12],norm:4.3,amb:.83,dif:.3,spec:.24,ao:.9,weave:.05});
 const o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d');x.drawImage(cv,0,0);
 if(!solid){x.globalCompositeOperation='destination-in';x.drawImage(r.ctx.canvas,0,0);}
 window.ASSETS[name]=o.toDataURL('image/png');
}
const ellipse=(x,y,rx,ry,a=0)=>c=>c.ellipse(x,y,rx,ry,a,0,Math.PI*2);
function fruit(r,white=false,egg=false){
 const p=c=>{c.moveTo(375,265);c.bezierCurveTo(245,290,207,475,200,650);c.bezierCurveTo(184,868,480,915,568,750);c.bezierCurveTo(650,600,482,260,375,265)};
 r.fill(p,white?'#dfdcc1':'#452956',{group:'fruit',dir:80,maxR:23});
 r.fill(c=>{c.moveTo(355,300);c.bezierCurveTo(270,420,254,687,304,752);c.bezierCurveTo(356,823,380,680,371,570);c.bezierCurveTo(355,446,402,360,355,300)},white?'#fff2d7':'#9562a2',{group:'fruit',dir:82,maxR:15});
 r.fill(c=>{c.moveTo(460,420);c.bezierCurveTo(490,560,550,730,462,794);c.bezierCurveTo(600,748,544,555,460,420)},white?'#b6bda0':'#2d2041',{group:'fruit',dir:78,maxR:14});
 if(!egg){r.fill(c=>{c.moveTo(350,290);c.lineTo(282,360);c.lineTo(349,332);c.lineTo(394,403);c.lineTo(411,330);c.lineTo(470,352);c.lineTo(424,291);c.closePath()},'#427852',{dir:35,maxR:10});r.line(c=>{c.moveTo(385,300);c.bezierCurveTo(398,242,345,208,365,168)},'#649153',25,{maxR:8,dir:90});}
}
bake('purple',r=>fruit(r));bake('white',r=>fruit(r,true));
bake('egg',r=>{r.fill(c=>{c.moveTo(400,250);c.bezierCurveTo(290,250,205,550,211,665);c.bezierCurveTo(218,863,582,863,588,665);c.bezierCurveTo(595,550,510,250,400,250)},'#e2dbc0',{group:'egg',dir:80,maxR:22});r.fill(ellipse(345,540,60,179,-.12),'#fff2d4',{group:'egg',dir:85,maxR:13})});
bake('leaf',r=>{r.fill(c=>{c.moveTo(112,790);c.bezierCurveTo(105,338,564,230,707,158);c.bezierCurveTo(691,610,471,890,112,790)},'#345f45',{maxR:27,dir:-42});r.fill(c=>{c.moveTo(135,771);c.bezierCurveTo(230,380,580,330,680,194);c.bezierCurveTo(510,460,400,520,135,771)},'#73904c',{group:'leaf',dir:-45,maxR:21});r.line(c=>{c.moveTo(115,790);c.lineTo(667,213)},'#b0b472',8,{maxR:4})});
bake('paper',r=>r.fill(c=>{c.moveTo(91,155);c.lineTo(706,138);c.lineTo(729,841);c.lineTo(83,855);c.closePath()},'#e5d4ae',{dir:0,maxR:37}));
bake('pot',r=>{r.fill(c=>{c.moveTo(182,470);c.lineTo(622,470);c.lineTo(560,873);c.lineTo(252,873);c.closePath()},'#ad5942',{group:'pot',dir:90,maxR:25});r.fill(c=>c.rect(160,443,480,86),'#dc9460',{maxR:20,dir:0});r.fill(c=>c.rect(267,550,60,246),'#ce7951',{group:'pot',dir:90,maxR:17})});
bake('stem',r=>{r.line(c=>{c.moveTo(380,950);c.bezierCurveTo(399,660,348,350,450,50)},'#48774b',27,{dir:90,maxR:13});for(let i=0;i<4;i++)r.line(c=>{c.moveTo(390,330+i*120);c.quadraticCurveTo(i%2?290:490,270+i*120,i%2?190:600,255+i*120)},'#63834a',16,{maxR:6})});
bake('bg',r=>{r.fill(c=>c.rect(0,0,W,H),'#e7d9bd',{dir:8,maxR:48,group:'bg'});r.fill(c=>{c.moveTo(0,0);c.lineTo(800,0);c.lineTo(800,180);c.bezierCurveTo(500,340,150,80,0,250);c.closePath()},'#c8b99b',{dir:0,maxR:48});r.fill(c=>{c.moveTo(0,760);c.bezierCurveTo(400,630,500,880,800,740);c.lineTo(800,1000);c.lineTo(0,1000)},'#d4c09c',{dir:-8,maxR:42})},true);
bake('dark',r=>{r.fill(c=>c.rect(0,0,W,H),'#282b3a',{dir:5,maxR:43});r.fill(c=>{c.moveTo(0,0);c.lineTo(800,0);c.lineTo(800,170);c.lineTo(0,330)},'#3b4052',{dir:-15,maxR:40})},true);
bake('stroke',r=>r.fill(c=>{c.moveTo(30,430);c.lineTo(710,385);c.lineTo(770,570);c.lineTo(50,609);c.closePath()},'#795080',{dir:0,maxR:22}));
window.READY=true;
