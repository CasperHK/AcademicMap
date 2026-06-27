import{getRequestEvent as p}from"solid-js/web";import{provideRequestEvent as E}from"solid-js/web/storage";import{d as b}from"./fetchEvent-CjAY2RQw.js";import g from"better-sqlite3";import{join as u}from"path";function v(e){return e==="zh-HK"?"zh-HK":"en"}const N={en:{title:"Academic Map",subtitle:"Academic System Relationship Map",loading:"Loading map...",selected:"Selected",viewDetails:"View details",langLabel:"Language",enLabel:"EN",zhHkLabel:"zh-HK",intro:"Introduction",relatedAcademics:"Related academics",topUniversities:"Top universities in this subject",firstLevelGraph:"Direct first-level academic graph",notFound:"Academic subject not found.",backToMap:"Back to map",academicCode:"Academic code",relation:"Relation",directionIncoming:"Related from",directionOutgoing:"Leads to",noRankings:"No university ranking data yet.",noRelated:"No directly related academics found."},"zh-HK":{title:"學術地圖",subtitle:"學術體系關係圖",loading:"正在載入地圖...",selected:"已選",viewDetails:"查看詳情",langLabel:"語言",enLabel:"英文",zhHkLabel:"繁體中文",intro:"學科簡介",relatedAcademics:"相關學科",topUniversities:"此學科知名大學排名",firstLevelGraph:"直接第一層相關學科圖",notFound:"找不到該學科。",backToMap:"返回地圖",academicCode:"學科代碼",relation:"關係",directionIncoming:"由以下學科關聯而來",directionOutgoing:"延伸至",noRankings:"暫時未有大學排名資料。",noRelated:"暫時未有直接相關學科。"}};function T(e,t,n){if(typeof e!="function")throw new Error("Export from a 'use server' module must be a function");const r="";return new Proxy(e,{get(s,i,o){return i==="url"?`${r}/_server?id=${encodeURIComponent(t)}&name=${encodeURIComponent(n)}`:i==="GET"?o:s[i]},apply(s,i,o){const c=p();if(!c)throw new Error("Cannot call server function outside of a request");const l=b(c);return l.locals.serverFunctionMeta={id:t+"#"+n},l.serverOnly=!0,E(l,()=>e.apply(i,o))}})}function m(e){return{data:{id:e.id,label:e.label,type:e.type,...e.description?{description:e.description}:{}}}}function A(e){return{data:{id:e.id,source:e.source,target:e.target,...e.label?{label:e.label}:{}}}}function y(e,t){return{nodes:e.map(m),edges:t.map(A)}}const f=process.env.DATABASE_PATH?u(process.cwd(),process.env.DATABASE_PATH):u(process.cwd(),"database","academic.db");let d=null;function a(){return d||(d=new g(f)),d}function _(e){return a().prepare(`SELECT
        e.id,
        e.source,
        e.target,
        COALESCE(et.label, e.label) AS label
      FROM edges e
      LEFT JOIN edge_translations et
        ON et.edge_id = e.id
       AND et.locale = ?
      ORDER BY e.id`).all(e)}function D(e,t){return a().prepare(`SELECT
        e.id,
        e.source,
        e.target,
        COALESCE(et.label, e.label) AS label
      FROM edges e
      LEFT JOIN edge_translations et
        ON et.edge_id = e.id
       AND et.locale = ?
      WHERE e.source = ? OR e.target = ?
      ORDER BY e.id`).all(t,e,e)}function h(e){return a().prepare(`SELECT
        n.id,
        COALESCE(nt.label, n.label) AS label,
        n.type,
        COALESCE(nt.description, n.description) AS description
      FROM nodes n
      LEFT JOIN node_translations nt
        ON nt.node_id = n.id
       AND nt.locale = ?
      ORDER BY n.id`).all(e)}function I(e,t){return a().prepare(`SELECT
          n.id,
          COALESCE(nt.label, n.label) AS label,
          n.type,
          COALESCE(nt.description, n.description) AS description
        FROM nodes n
        LEFT JOIN node_translations nt
          ON nt.node_id = n.id
         AND nt.locale = ?
        WHERE n.id = ?`).get(t,e)??null}function B(e,t){if(e.length===0)return[];const n=a(),r=e.map(()=>"?").join(", ");return n.prepare(`SELECT
        n.id,
        COALESCE(nt.label, n.label) AS label,
        n.type,
        COALESCE(nt.description, n.description) AS description
      FROM nodes n
      LEFT JOIN node_translations nt
        ON nt.node_id = n.id
       AND nt.locale = ?
      WHERE n.id IN (${r})
      ORDER BY n.label`).all(t,...e)}function F(e){return a().prepare(`SELECT
        id,
        node_id,
        rank,
        university,
        country
      FROM university_rankings
      WHERE node_id = ?
      ORDER BY rank ASC`).all(e)}export{N as U,_ as a,I as b,T as c,D as d,B as e,F as f,h as g,y as m,v as p};
