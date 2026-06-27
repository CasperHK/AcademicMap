import{getOwner as z,getListener as P,onCleanup as U,sharedConfig as y,createSignal as _,startTransition as S,createResource as j,untrack as W,createEffect as K,onMount as Y}from"solid-js";import{isServer as u,getRequestEvent as v,ssr as R,ssrHydrationKey as C,escape as b}from"solid-js/web";import"cytoscape";import{t as q,h as G,v as J,r as V,w as Q}from"./routing-Cb18Ae2O.js";import{provideRequestEvent as X}from"solid-js/web/storage";import Z from"better-sqlite3";import{join as I}from"path";const ee="Location",te=5e3,ne=18e4;let T=new Map;u||setInterval(()=>{const e=Date.now();for(let[t,n]of T.entries())!n[4].count&&e-n[0]>ne&&T.delete(t)},3e5);function O(){if(!u)return T;const e=v();if(!e)throw new Error("Cannot find cache context");return(e.router||(e.router={})).cache||(e.router.cache=new Map)}function L(e,t){e.GET&&(e=e.GET);const n=(...a)=>{const o=O(),i=G(),h=J(),m=z()?q():void 0,s=Date.now(),l=t+F(a);let r=o.get(l),D;if(u){const c=v();if(c){const f=(c.router||(c.router={})).dataOnly;if(f){const g=c&&(c.router.data||(c.router.data={}));if(g&&l in g)return g[l];if(Array.isArray(f)&&!re(l,f))return g[l]=void 0,Promise.resolve()}}}if(P()&&!u&&(D=!0,U(()=>r[4].count--)),r&&r[0]&&(u||i==="native"||r[4].count||Date.now()-r[0]<te)){D&&(r[4].count++,r[4][0]()),r[3]==="preload"&&i!=="preload"&&(r[0]=s);let c=r[1];return i!=="preload"&&(c="then"in r[1]?r[1].then(E(!1),E(!0)):E(!1)(r[1]),!u&&i==="navigate"&&S(()=>r[4][1](r[0]))),h&&"then"in c&&c.catch(()=>{}),c}let d;if(!u&&y.has&&y.has(l)?(d=y.load(l),delete globalThis._$HY.r[l]):d=e(...a),r?(r[0]=s,r[1]=d,r[3]=i,!u&&i==="navigate"&&S(()=>r[4][1](r[0]))):(o.set(l,r=[s,d,,i,_(s)]),r[4].count=0),D&&(r[4].count++,r[4][0]()),u){const c=v();if(c&&c.router.dataOnly)return c.router.data[l]=d}if(i!=="preload"&&(d="then"in d?d.then(E(!1),E(!0)):E(!1)(d)),h&&"then"in d&&d.catch(()=>{}),u&&y.context&&y.context.async&&!y.context.noHydrate){const c=v();(!c||!c.serverOnly)&&y.context.serialize(l,d)}return d;function E(c){return async f=>{if(f instanceof Response){const g=f.headers.get(ee);if(g!==null){if(m&&g.startsWith("/"))S(()=>{m(g,{replace:!0})});else if(!u)window.location.href=g;else if(u){const H=v();H&&(H.response={status:302,headers:new Headers({Location:g})})}return}f.customBody&&(f=await f.customBody())}if(c)throw f;return r[2]=f,f}}};return n.keyFor=(...a)=>t+F(a),n.key=t,n}L.get=e=>O().get(e)[2];L.set=(e,t)=>{const n=O(),a=Date.now();let o=n.get(e);o?(o[0]=a,o[1]=Promise.resolve(t),o[2]=t,o[3]="preload"):(n.set(e,o=[a,Promise.resolve(t),t,"preload",_(a)]),o[4].count=0)};L.delete=e=>O().delete(e);L.clear=()=>O().clear();const B=L;function re(e,t){for(let n of t)if(n&&e.startsWith(n))return!0;return!1}function F(e){return JSON.stringify(e,(t,n)=>ae(n)?Object.keys(n).sort().reduce((a,o)=>(a[o]=n[o],a),{}):n)}function ae(e){let t;return e!=null&&typeof e=="object"&&(!(t=Object.getPrototypeOf(e))||t===Object.prototype)}function Se(e,t){let n,a=()=>!n||n.state==="unresolved"?void 0:n.latest;[n]=j(()=>oe(e,W(a)),i=>i,t);const o=()=>n();return Object.defineProperty(o,"latest",{get(){return n.latest}}),o}class p{static all(){return new p}static allSettled(){return new p}static any(){return new p}static race(){return new p}static reject(){return new p}static resolve(){return new p}catch(){return new p}then(){return new p}finally(){return new p}}function oe(e,t){if(u||!y.context)return e(t);const n=fetch,a=Promise;try{return window.fetch=()=>new p,Promise=p,e(t)}finally{window.fetch=n,Promise=a}}function M(e){return e==="zh-HK"?"zh-HK":"en"}const N={en:{title:"Academic Map",subtitle:"Academic System Relationship Map",loading:"Loading map...",selected:"Selected",viewDetails:"View details",langLabel:"Language",enLabel:"EN",zhHkLabel:"zh-HK",intro:"Introduction",relatedAcademics:"Related academics",topUniversities:"Top universities in this subject",firstLevelGraph:"Direct first-level academic graph",notFound:"Academic subject not found.",backToMap:"Back to map",academicCode:"Academic code",relation:"Relation",directionIncoming:"Related from",directionOutgoing:"Leads to",noRankings:"No university ranking data yet.",noRelated:"No directly related academics found."},"zh-HK":{title:"學術地圖",subtitle:"學術體系關係圖",loading:"正在載入地圖...",selected:"已選",viewDetails:"查看詳情",langLabel:"語言",enLabel:"英文",zhHkLabel:"繁體中文",intro:"學科簡介",relatedAcademics:"相關學科",topUniversities:"此學科知名大學排名",firstLevelGraph:"直接第一層相關學科圖",notFound:"找不到該學科。",backToMap:"返回地圖",academicCode:"學科代碼",relation:"關係",directionIncoming:"由以下學科關聯而來",directionOutgoing:"延伸至",noRankings:"暫時未有大學排名資料。",noRelated:"暫時未有直接相關學科。"}};var se=["<div",' class="relative h-full w-full"><div class="h-full w-full"></div><!--$-->',"<!--/--></div>"],ce=["<div",' class="absolute bottom-4 left-4 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white shadow-lg"><div><!--$-->','<!--/-->: <span class="font-semibold">',"</span></div><!--$-->","<!--/--></div>"],ie=["<a",' class="mt-2 inline-block text-cyan-300 transition hover:text-cyan-200" href="','">',"</a>"];const xe=e=>{const[t,n]=_(null);return K(()=>{}),Y(()=>{}),R(se,C(),t()&&R(ce,C(),b(N[e.locale].selected),b(t().label),e.detailHrefBase&&R(ie,C(),`${b(e.detailHrefBase,!0)}${b(t().id,!0)}?lang=${b(e.locale,!0)}`,b(N[e.locale].viewDetails))))};var le=["<div",' class="flex h-screen flex-col bg-slate-900 text-white"><header class="flex items-center justify-between border-b border-slate-700 px-6 py-3"><div class="flex items-center gap-3"><h1 class="text-xl font-semibold tracking-wide">🎓 <!--$-->','<!--/--></h1><span class="text-sm text-slate-400">','</span></div><div class="flex items-center gap-2 text-xs"><span class="text-slate-400">','</span><button class="','" type="button">','</button><button class="','" type="button">','</button></div></header><main class="flex flex-1 overflow-hidden">',"</main></div>"];const Te=e=>{V();const t=()=>N[e.locale];return R(le,C(),b(t().title),b(t().subtitle),b(t().langLabel),`rounded border px-2 py-1 transition ${e.locale==="en"?"border-cyan-400 bg-cyan-500/20 text-cyan-200":"border-slate-600 text-slate-300 hover:border-slate-500"}`,b(t().enLabel),`rounded border px-2 py-1 transition ${e.locale==="zh-HK"?"border-cyan-400 bg-cyan-500/20 text-cyan-200":"border-slate-600 text-slate-300 hover:border-slate-500"}`,b(t().zhHkLabel),b(e.children))};function $(e,t,n){if(typeof e!="function")throw new Error("Export from a 'use server' module must be a function");const a="";return new Proxy(e,{get(o,i,h){return i==="url"?`${a}/_server?id=${encodeURIComponent(t)}&name=${encodeURIComponent(n)}`:i==="GET"?h:o[i]},apply(o,i,h){const A=v();if(!A)throw new Error("Cannot call server function outside of a request");const m=Q(A);return m.locals.serverFunctionMeta={id:t+"#"+n},m.serverOnly=!0,X(m,()=>e.apply(i,h))}})}function de(e){return{data:{id:e.id,label:e.label,type:e.type,...e.description?{description:e.description}:{}}}}function ue(e){return{data:{id:e.id,source:e.source,target:e.target,...e.label?{label:e.label}:{}}}}function k(e,t){return{nodes:e.map(de),edges:t.map(ue)}}const fe=process.env.DATABASE_PATH?I(process.cwd(),process.env.DATABASE_PATH):I(process.cwd(),"database","academic.db");let x=null;function w(){return x||(x=new Z(fe)),x}function pe(e){return w().prepare(`SELECT
        e.id,
        e.source,
        e.target,
        COALESCE(et.label, e.label) AS label
      FROM edges e
      LEFT JOIN edge_translations et
        ON et.edge_id = e.id
       AND et.locale = ?
      ORDER BY e.id`).all(e)}function be(e,t){return w().prepare(`SELECT
        e.id,
        e.source,
        e.target,
        COALESCE(et.label, e.label) AS label
      FROM edges e
      LEFT JOIN edge_translations et
        ON et.edge_id = e.id
       AND et.locale = ?
      WHERE e.source = ? OR e.target = ?
      ORDER BY e.id`).all(t,e,e)}function ge(e){return w().prepare(`SELECT
        n.id,
        COALESCE(nt.label, n.label) AS label,
        n.type,
        COALESCE(nt.description, n.description) AS description
      FROM nodes n
      LEFT JOIN node_translations nt
        ON nt.node_id = n.id
       AND nt.locale = ?
      ORDER BY n.id`).all(e)}function he(e,t){return w().prepare(`SELECT
          n.id,
          COALESCE(nt.label, n.label) AS label,
          n.type,
          COALESCE(nt.description, n.description) AS description
        FROM nodes n
        LEFT JOIN node_translations nt
          ON nt.node_id = n.id
         AND nt.locale = ?
        WHERE n.id = ?`).get(t,e)??null}function me(e,t){if(e.length===0)return[];const n=w(),a=e.map(()=>"?").join(", ");return n.prepare(`SELECT
        n.id,
        COALESCE(nt.label, n.label) AS label,
        n.type,
        COALESCE(nt.description, n.description) AS description
      FROM nodes n
      LEFT JOIN node_translations nt
        ON nt.node_id = n.id
       AND nt.locale = ?
      WHERE n.id IN (${a})
      ORDER BY n.label`).all(t,...e)}function ye(e){return w().prepare(`SELECT
        id,
        node_id,
        rank,
        university,
        country
      FROM university_rankings
      WHERE node_id = ?
      ORDER BY rank ASC`).all(e)}const Ee=$(async e=>{const t=M(e),n=ge(t),a=pe(t);return k(n,a)},"src_lib_server_map_ts--getMapData_cache","C:/Users/Casper/Documents/My Workspace/Workspace/AcademicMap/src/lib/server/map.ts?tsr-directive-use-server="),Ne=B(Ee,"mapData"),ve=$(async(e,t)=>{const n=M(t),a=he(e,n);if(!a)return null;const o=be(e,n),i=Array.from(new Set(o.flatMap(s=>[s.source,s.target]))),h=me(i,n),A=new Map(h.map(s=>[s.id,s])),m=o.map(s=>{const l=s.source===e?s.target:s.source,r=A.get(l);return r?{node:r,edge:s,direction:s.source===e?"outgoing":"incoming"}:null}).filter(s=>s!==null).sort((s,l)=>s.node.label.localeCompare(l.node.label));return{academic:a,relatedAcademics:m,rankings:ye(e),graph:k(h,o)}},"src_lib_server_map_ts--getAcademicDetailData_cache","C:/Users/Casper/Documents/My Workspace/Workspace/AcademicMap/src/lib/server/map.ts?tsr-directive-use-server="),_e=B(ve,"academicDetailData");export{Te as A,N as U,xe as a,Ne as b,Se as c,_e as g,M as p};
