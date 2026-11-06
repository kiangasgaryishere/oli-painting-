const C=document.getElementById('c');C.width=1080;C.height=1920;const g=C.getContext('2d',{alpha:false});
const names=['purple','white','egg','leaf','pot','stem','paper','bg','dark','stroke'];const A={};
await Promise.all(names.map(async n=>{const im=new Image();im.src=`assets/${n}.png`;await im.decode();A[n]=im}));await document.fonts.load('700 60px Arabic');await document.fonts.load('400 48px Arabic');
const cues=await(await fetch('cues.json')).json(),subs=await(await fetch('subtitles.json')).json();
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},lerp=(a,b,x)=>a+(b-a)*x;
const ink='#30283d',cream='#f7edda',gold='#e6b45b',plum='#754678';
function sprite(n,x,y,w,h,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.drawImage(A[n],-w/2,-h/2,w,h);g.restore()}
function txt(s,x,y,size=60,color=ink,weight=700){g.save();g.fillStyle=color;g.font=`${weight} ${size}px Arabic`;g.textAlign='center';g.textBaseline='middle';g.direction=/[\u0600-\u06ff]/.test(s)?'rtl':'ltr';g.fillText(s,x,y);g.restore()}
function line(pts,color=plum,w=10,p=1){g.save();g.strokeStyle=color;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.beginPath();const n=(pts.length-1)*clamp(p);g.moveTo(...pts[0]);for(let i=1;i<=Math.floor(n);i++)g.lineTo(...pts[i]);const i=Math.floor(n);if(i<pts.length-1)g.lineTo(lerp(pts[i][0],pts[i+1][0],n-i),lerp(pts[i][1],pts[i+1][1],n-i));g.stroke();g.restore()}
function card(s,x,y,w=600,h=205,rot=0,small=''){g.save();g.translate(x,y);g.rotate(rot);g.save();g.shadowColor='#24182635';g.shadowBlur=22;g.shadowOffsetY=15;sprite('paper',0,0,w*1.24,h*1.4);g.restore();txt(s,0,small?-5:0,/^[A-Z +]+$/.test(s)?Math.min(72,w/9):Math.min(62,w/6));if(small)txt(small,0,64,26,plum,400);g.restore()}
function fruit(n,x=540,y=720,scale=1,rot=0){sprite(n,x,y,520*scale,650*scale,rot)}
function tag(s,tone=false){txt(s,540,310,40,tone?cream:plum)}
function garden(t,u,white=true,zoom=1){
 g.save();g.translate(540,775);g.scale(zoom,zoom);g.translate(-540,-775);
 sprite('stem',520,790,690,1130);sprite('pot',530,1205,630,550);
 fruit(white?'white':'purple',565,680,.95,Math.sin(t*.9)*.025);
 sprite('leaf',295,580,410,430,-.38+Math.sin(t*.7)*.025);sprite('leaf',735,385,350,370,1.6+Math.sin(t*.65)*.025);sprite('leaf',325,885,300,350,-.8);
 g.restore();
}
function paths(t,u,reverse=false){
 const pts=[[230,1035],[350,950],[220,790],[435,650],[680,695],[760,485]];
 line(pts,'#b29875',19);line(reverse?[...pts].reverse():pts,plum,12,ease(u*1.7));
 const labs=['جنوب آسیا','فارسی','عربی','کاتالان','فرانسوی','بریتانیا'];
 pts.forEach(([x,y],i)=>{g.fillStyle=i<Math.ceil(u*7)?gold:'#c9b58f';g.beginPath();g.arc(x,y,17,0,7);g.fill();card(labs[i],x+(i%2?80:50),y-65,250,100,(i%2?1:-1)*.025)});
}
function scene(i,t,u){
 const dark=[6,12,13,14].includes(i);g.drawImage(A[dark?'dark':'bg'],0,0,1080,1920);if(!dark){g.fillStyle='#ecdfc476';g.fillRect(0,0,1080,1920)}
 // Curated chapter marker and restrained progress line.
 txt(i<13?'۰۱  /  رازِ شکل':i<25?'۰۲  /  سفرِ واژه':'۰۳  /  دو داستان',540,180,28,dark?'#d5c8ad':'#81705a',400);
 g.save();const z=1+.035*ease(u);g.translate(540,800);g.scale(z,z);g.translate(-540+Math.sin(u*1.7)*8,-800);
 switch(i){
 case 0:{tag('تخم‌مرغ… روی بوته؟');garden(t,u,true,lerp(1.65,1,ease(u*.95)));sprite('leaf',lerp(535,-170,ease(u*2)),750,680,790,-.4);break}
 case 1:{tag('انگلیسی آمریکایی');fruit('white',540,650,1.05,-.12);card('EGG + PLANT',540,1100,780,200,0,'گیاهِ تخم‌مرغی');break}
 case 2:{fruit('purple',540,800,1.3,Math.sin(u*6)*.09);txt('؟',765,460+Math.sin(u*6)*15,190,plum);tag('مگه تخم‌مرغ می‌ذاره؟');break}
 case 3:{tag('انگلیسی بریتانیایی');fruit('purple',540,650,1.05,.1);card('AUBERGINE',540,1100,800,210,-.025);break}
 case 4:{fruit('purple',540,700,1.1,-.08);card('بادمجون',540,1120,650,230,.02);break}
 case 5:{tag('سه اسم، یک چیز');fruit('purple',540,760,.92);card('EGGPLANT',295,470,420,155,-.07);card('AUBERGINE',770,480,430,155,.06);card('بادمجون',540,1130,500,180);line([[295,560],[410,665]],plum,7);line([[770,570],[665,665]],plum,7);break}
 case 6:{fruit('purple',540,800,1.3);txt('چرا؟',540,380,110,cream);break}
 case 7:{tag('شکل‌های متفاوت');for(let k=0;k<3;k++)fruit(k===1?'white':'purple',240+k*300,760+Math.sin(t+k)*15,k===1?.85:.8,(k-1)*.16);card('همه یک شکل نیستند',540,1140,720,180);break}
 case 8:{tag('دو مسیر متفاوت');fruit('purple',540,490,.7);line([[540,700],[300,840],[280,1040]],plum,13,ease(u*2));line([[540,700],[780,840],[800,1040]],plum,13,ease(u*2));card('ظاهر',280,1110,330,160,-.04);card('سفر واژه',800,1110,360,160,.04);break}
 case 9:{tag('این یکی را ببین…');garden(t,u,true,1.1);sprite('leaf',lerp(510,120,ease(u*1.6)),700,530,660,-.4);break}
 case 10:{tag('سفید · کوچک · بیضی');fruit('white',540,730,1.45,lerp(-.16,.1,ease(u)));sprite('leaf',830,1130,310,340,1.3);break}
 case 11:{tag('درست شبیه تخم‌مرغ');fruit('white',310,770,1.1,-.1);fruit('egg',770,770,1.1,.1);txt('≈',540,790,98,plum);break}
 case 12:{txt('EGG',310,440,96,cream);txt('PLANT',760,440,96,cream);fruit('white',310,730,.95);sprite('leaf',770,740,430,500,.2);txt('EGGPLANT',540,1110,105,gold);line([[280,990],[800,990]],gold,9,ease(u*2));break}
 case 13:{txt('AUBERGINE',540,510,105,cream);fruit('purple',540,880,1.05,.12);txt('این بار، ماجرا شکل نیست',540,1190,45,gold);break}
 case 14:{txt('سفرِ یک کلمه',540,380,85,cream);line([[140,1040],[300,720],[540,800],[840,480]],gold,18,ease(u*1.3));card('AUBERGINE',540,680,720,200,-.1);sprite('stroke',lerp(150,900,ease(u)),1050,450,270,-.4);break}
 case 15:{tag('ردّ کلمه را دنبال کن');card('اروپا',300,550,390,170,-.05);card('جنوب آسیا',700,1020,470,180,.04);line([[300,680],[320,790],[650,800],[700,900]],plum,15,ease(u*1.7));fruit('purple',780,560,.52,.2);txt('جست‌وجو در گذشته',540,1210,37,plum,400);break}
 case 16:{tag('از زبان‌های منطقه به فارسی');line([[250,650],[500,760],[800,950]],plum,15,ease(u*1.7));card('جنوب آسیا',300,570,460,190,-.04);card('فارسی',750,990,410,200,.04);break}
 case 17:{tag('در فارسی قدیم');card('بادنگان',500,600,660,240,-.07);card('بادنجان',580,950,660,240,.05);fruit('purple',220,1080,.52,-.23);break}
 case 18:{tag('نام وارد عربی می‌شود');card('بادنجان',360,550,510,205,-.05);line([[360,680],[540,760],[700,850]],plum,14,ease(u*1.8));card('باذنجان',680,980,550,220,.045);break}
 case 19:{tag('در مسیر ارتباط فرهنگ‌ها');paths(t,u);break}
 case 20:{tag('فرانسوی');card('AUBERGINE',540,700,830,270,-.025);fruit('purple',540,1110,.65,.13);break}
 case 21:{tag('یک نام، در دو زبان');card('AUBERGINE',540,580,770,230,-.035,'فرانسوی');line([[540,735],[540,865]],plum,13,ease(u*2));card('AUBERGINE',540,1030,770,230,.025,'انگلیسی بریتانیایی');break}
 case 22:{tag('حالا فکر کن…');sprite('paper',540,830,1010,1030,.02);txt('MENU',540,600,100,plum);fruit('purple',540,880,.66,.2);break}
 case 23:{tag('یک رستوران در لندن');sprite('paper',540,815,1090,1200,-.025);txt('MENU',540,480,92,plum);line([[290,580],[790,580]],'#a88c61',3);txt('AUBERGINE',540,710,80);txt('roasted · seasonal',540,800,28,plum,400);fruit('purple',540,1040,.65,.1);break}
 case 24:{tag('نام روی منو، ردّی از گذشته');paths(t,1-u*.8,true);card('بادنجان',540,1175,450,155);break}
 case 25:{tag('اولی: نام‌گذاری از ظاهر');fruit('white',320,720,1.15,-.1);fruit('egg',770,720,1.05,.1);card('EGGPLANT',540,1115,790,220);break}
 case 26:{tag('دومی: سفر میان زبان‌ها');card('AUBERGINE',540,470,800,210);line([[220,770],[450,950],[820,900]],plum,13,ease(u*2));card('فارسی',270,730,350,160,-.04);card('فرانسوی',765,1000,410,160,.035);txt('یک گیاه، دو داستان',540,1195,57,plum);break}
 case 27:{fruit('purple',540,780,1.4,-.08);tag('حالا نوبت شماست');break}
 case 28:{tag('شما چی صداش می‌کنید؟');fruit('purple',540,740,1.05,Math.sin(t*.7)*.035);const labels=['بادمجون','بادنجان','بادمجان','اسم دیگه؟'];const pos=[[300,440],[780,450],[300,1090],[780,1100]];labels.forEach((s,k)=>{let v=ease((u-k*.16)*5);if(v>0){g.save();g.globalAlpha=v;card(s,pos[k][0],pos[k][1]+(1-v)*50,420,170,(k%2?.035:-.035));g.restore()}});break}
 }
 g.restore();
}
function subtitle(t){const s=subs.find(s=>t>=s.t0&&t<s.t1);if(!s)return;g.save();g.font='700 54px Arabic';const words=s.text.split(' ');let lines=[''];for(const w of words){const k=lines.length-1;if(g.measureText((lines[k]+' '+w).trim()).width>820)lines.push(w);else lines[k]+=(lines[k]?' ':'')+w}const h=lines.length*85+38,y=1390;g.fillStyle='#25212ded';g.beginPath();g.roundRect(94,y,892,h,25);g.fill();lines.forEach((l,i)=>txt(l,540,y+55+i*85,54,cream));g.restore()}
window.DUR=100.388571;window.EV=cues.map(c=>({t:c.t0,type:[6,22].includes(c.id)?'silence':'paper'}));
window.render=t=>{let i=cues.findIndex(c=>t>=c.t0&&t<c.t1);if(i<0)i=28;const q=cues[i],u=clamp((t-q.t0)/(q.t1-q.t0));g.setTransform(1,0,0,1,0,0);scene(i,t,u);
 // The next shot paints across the previous one in a stepped knife edge, never a dissolve.
 const dt=t-q.t0;if(i>0&&dt<.44){g.save();g.beginPath();const edge=1080*ease(dt/.44);g.moveTo(edge,0);for(let y=0;y<=1920;y+=48)g.lineTo(edge+Math.sin(y*.017)*24,y);g.lineTo(1080,1920);g.lineTo(1080,0);g.closePath();g.clip();scene(i-1,q.t0-.001,1);g.restore()}
 subtitle(t);g.fillStyle='#aa9673';g.fillRect(130,1710,820,3);g.fillStyle=plum;g.fillRect(130,1710,820*clamp(t/window.DUR),3);
};window.TEXTS=t=>[];window.render(0);window.READY=true;
