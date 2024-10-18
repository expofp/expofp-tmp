(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function d(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=d(t);fetch(t.href,r)}})();let T=performance.now();const f=document.getElementById("maxMBytes");let l=parseInt(window.localStorage.getItem("targetMBytes"));l||(l=1e4,window.localStorage.setItem("targetMBytes",l.toString()));f.value=l.toString();f.addEventListener("input",()=>{l=parseInt(f.value),window.localStorage.setItem("targetMBytes",l.toString()),p()});const y=document.getElementById("bytesPerTexel");let n=parseInt(window.localStorage.getItem("bytesPerTexel"));n||(n=4,window.localStorage.setItem("bytesPerTexel",n.toString()));y.value=n.toString();y.addEventListener("input",()=>{n=parseInt(y.value),window.localStorage.setItem("bytesPerTexel",n.toString()),p()});document.getElementById("lastMBytes").innerText=parseInt(window.localStorage.getItem("achievedBytes"))/1024/1024+" MB";const s=1024*3,c=1024*3,h=document.createElement("canvas");h.width=s;h.height=c;const M=h.getContext("2d"),E=document.getElementById("canvas");E.width=s;E.height=c;const e=E.getContext("webgl2");function p(){const g=l*1024*1024,a=Math.floor(g/(s*c*n)),d=a*s*c*n;u("Setup "+n+" bytes per texel, "+a+" textures, target "+d/1024/1024+" MB, width "+s+", height "+c);const i=M.createImageData(s,c);function t(){for(let o=0;o<i.height*i.width;o++)i[o]=Math.floor(Math.random()*256)}async function r(){T=performance.now();let o=0;const x=1024*1024*100;let B=0,I=0;function w(){if(I>=a){u("Done");return}const S=e.createTexture();switch(e.bindTexture(e.TEXTURE_2D,S),t(),n){case 1:e.texImage2D(e.TEXTURE_2D,0,e.ALPHA,s,c,0,e.ALPHA,e.UNSIGNED_BYTE,i);break;case 2:e.texImage2D(e.TEXTURE_2D,0,e.RGBA,s,c,0,e.RGBA,e.UNSIGNED_SHORT_4_4_4_4,i);break;case 4:e.texImage2D(e.TEXTURE_2D,0,e.RGBA,s,c,0,e.RGBA,e.UNSIGNED_BYTE,i);break;default:throw new Error("Invalid bytesPerTexel")}const m=e.getError();if(m!==e.NO_ERROR){m===e.OUT_OF_MEMORY&&u("Out of memory"),u("Error: "+m);return}o+=s*c*n,o-B>x&&(u("Allocated "+o/1024/1024+" MB"),B=o),window.localStorage.setItem("achievedBytes",o.toString()),I++,requestAnimationFrame(w)}w()}document.getElementById("startButton").onclick=r}p();function u(g){const a=Math.ceil(performance.now()-T);console.log(a,g);const d=document.getElementById("log");d.innerHTML=`${a} ${g}
${d.innerHTML}`}
