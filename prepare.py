from pathlib import Path
import json,re
P=Path(__file__).parent
lines=[l.strip() for l in (P/'voice.md').read_text().splitlines() if l.strip()]
lines=[*lines[0].replace('🤯','').split('آمریکایی‌ها',1),*lines[1:]]
lines[1]='آمریکایی‌ها'+lines[1]
b=[0,3.1933,6.7236,8.9998,13.256,15.0215,17.5021,18.5923,21.4276,24.29,27.977,31.9092,33.6856,37.0947,41.0873,43.2551,50.4791,54.4642,59.3701,63.5489,69.9387,72.2519,75.7833,76.8278,80.1519,85.66,89.3957,93.0337,94.4573,100.388571]
assert len(lines)==len(b)-1
cues=[dict(id=i,t0=b[i],t1=b[i+1],text=l.strip()) for i,l in enumerate(lines)]
(P/'cues.json').write_text(json.dumps(cues,ensure_ascii=False,indent=2))
# Subtitle splits follow the same phrase boundaries as the narration; longer clauses split at punctuation.
subs=[]
for c in cues:
 text=c['text'].replace('!','').replace('؟!','؟')
 words=text.split(); chunks=[];buf=[]
 for w in words:
  if len(' '.join(buf+[w]))>53 and len(buf)>=4:chunks.append(' '.join(buf));buf=[]
  buf.append(w)
 if buf:chunks.append(' '.join(buf))
 total=sum(len(x) for x in chunks);at=c['t0']
 for j,x in enumerate(chunks):
  end=c['t1'] if j==len(chunks)-1 else at+(c['t1']-c['t0'])*len(x)/total
  subs.append(dict(t0=at,t1=end,text=x));at=end
(P/'subtitles.json').write_text(json.dumps(subs,ensure_ascii=False,indent=2))
def ts(t):
 ms=round(t*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
(P/'eggplant-reel.srt').write_text('\n\n'.join(f'{i+1}\n{ts(c["t0"])} --> {ts(c["t1"])}\n{c["text"]}' for i,c in enumerate(subs))+'\n')
