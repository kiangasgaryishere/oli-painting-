from pathlib import Path
import json,sys,subprocess,os
import numpy as np,soundfile as sf
P=Path(__file__).parent
LIB=Path(os.environ.get('LEMO_OPUSCAR_HOME',P.parent/'lemo-opuscar'))
sys.path.insert(0,str(LIB/'core/audio'))
(P/'out').mkdir(exist_ok=True)
import sfx
subprocess.run(['ffmpeg','-y','-v','error','-i',str(P/'narration.mp3'),'-ar','48000','-ac','1',str(P/'out/narration.wav')],check=True)
v,sr=sf.read(P/'out/narration.wav');v=v.astype(np.float32)
n=int(round(100.388571*sr));v=np.pad(v,(0,max(0,n-len(v))))[:n];foley=np.zeros(n,dtype=np.float32)
def add(a,t,gain):
 start=round(t*sr);end=min(n,start+len(a));foley[start:end]+=a[:end-start]*gain

def paper(d=.23):
 t=sfx.t_(d);return sfx.norm(sfx.bp(sfx.noise(d),650,3900)*np.sin(np.pi*t/d)**2*(.65+.35*np.sin(t*177)))
def scrape(d=.35):
 t=sfx.t_(d);return sfx.norm(sfx.bp(sfx.noise(d),900,5100)*np.sin(np.pi*t/d)**1.6*(.7+.3*np.sin(t*500)))
def touch(d=.10):
 t=sfx.t_(d);return sfx.norm(sfx.lp(sfx.noise(d),1700)*np.exp(-t/.022))
rows=[]
for q in json.loads((P/'cues.json').read_text()):
 i=q['id'];t=q['t0']
 if i in [0,6,22]:continue
 kind='scrape' if i in [8,12,14,15,16,19,24,26] else 'paper'
 a=scrape() if kind=='scrape' else paper()
 add(a,max(0,t-.045),.018 if kind=='paper' else .021)
 rows.append(dict(t=max(0,t-.045),kind=kind,gain=.018 if kind=='paper' else .021))
for t in [1.1,2.25,4.4,5.45,15.4,16.1,29,30,32.2,34.1,35.1,55.1,57.3,60.9,65.1,67.7,70.7,73.3,77.3,86.4,95,96.2,97.5,98.8]:
 add(touch(),t,.022);rows.append(dict(t=t,kind='surface contact',gain=.022))
add(paper(.45),.45,.017);add(paper(.34),26.1,.017)
# Preserve the supplied performance, including its pauses. The foley has no sustained tones or music.
x=v+foley
sf.write(P/'out/mix.wav',x,sr,subtype='PCM_24');sf.write(P/'out/foley.wav',foley,sr,subtype='PCM_24')
(P/'sound-cues.json').write_text(json.dumps(rows,indent=2))
print('Voice length',len(v)/sr,'mix peak',float(abs(x).max()),'foley peak',float(abs(foley).max()))
