import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { validateSnapshot, digest, bundledSnapshot } from '../src/publication.js';
const [command,...args]=process.argv.slice(2);
if(command==='draft'){
  const [id,out]=args;
  if(!['memory','ai','pcb','policy'].includes(id)||!out)throw new Error('Usage: draft memory|ai|pcb|policy output.json');
  const base=new URL(process.env.DSH_PUBLISHER_URL||'http://127.0.0.1:8930');
  if(!['127.0.0.1','localhost'].includes(base.hostname))throw new Error('Publisher must connect to a local DSH host');
  const token=process.env.DSH_PUBLISHER_TOKEN;if(!token)throw new Error('Set DSH_PUBLISHER_TOKEN from your local DSH web login');
  const login=await fetch(new URL('/?token='+encodeURIComponent(token),base),{redirect:'manual'});
  const cookie=login.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ');if(!cookie)throw new Error('Local DSH login failed');
  const response=await fetch(new URL('/api/caidazi-boards',base),{method:'POST',headers:{Cookie:cookie,'Content-Type':'application/json'},body:JSON.stringify({type:'client-request',rpcId:crypto.randomUUID(),method:'caidazi-boards',payload:{action:'draft',payload:{id}}}),signal:AbortSignal.timeout(300000)});
  if(!response.ok)throw new Error('Draft endpoint failed: '+response.status);
  const result=(await response.json()).result;if(!result.ok)throw new Error(result.error.message);
  await mkdir(dirname(resolve(out)),{recursive:true});await writeFile(out,JSON.stringify(result.value,null,2)+'\n');
  console.log(JSON.stringify({status:result.value.status,id,output:out,reason:result.value.reason}));
}else if(command==='publish'){
  const [file,version,reviewed]=args;
  if(!file||!version||reviewed!=='--reviewed')throw new Error('Usage: publish reviewed-snapshot.json YYYY-MM-DD.N --reviewed');
  const input=JSON.parse(await readFile(file,'utf8'));
  const s=validateSnapshot({...input.snapshot||input,version,publishedAt:new Date().toISOString()});
  const text=JSON.stringify(s,null,2)+'\n',dir=new URL('../research/',import.meta.url),path=`snapshots/${version}.json`;
  try{const prev=JSON.parse(await readFile(new URL('latest-v2.json',dir),'utf8'));if(version.localeCompare(prev.version,undefined,{numeric:true})<=0)throw new Error('Publication version must increase');}catch(e){if(e.code!=='ENOENT')throw e}
  await mkdir(new URL('snapshots/',dir),{recursive:true});
  await writeFile(new URL(path,dir),text,{flag:'wx'});
  await writeFile(new URL('latest-v2.json',dir),JSON.stringify({schemaVersion:2,version,path,sha256:digest(text)},null,2)+'\n');
  console.log('Prepared research/'+path+' and latest-v2.json. Review git diff, then commit/push to publish.');
}else if(command==='seed'){
  const [out]=args;if(!out)throw new Error('Usage: seed output.json');
  await writeFile(out,JSON.stringify(bundledSnapshot,null,2)+'\n');
}else throw new Error('Commands: draft | seed | publish');
