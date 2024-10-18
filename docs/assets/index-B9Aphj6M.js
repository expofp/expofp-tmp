(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function d(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=d(t);fetch(t.href,o)}})();let E=performance.now();const m=document.getElementById("maxMBytes");let l=parseInt(window.localStorage.getItem("targetMBytes"));l||(l=1e4,window.localStorage.setItem("targetMBytes",l.toString()));m.value=l.toString();m.addEventListener("input",()=>{l=parseInt(m.value),window.localStorage.setItem("targetMBytes",l.toString()),p()});const f=document.getElementById("bytesPerTexel");let r=parseInt(window.localStorage.getItem("bytesPerTexel"));r||(r=4,window.localStorage.setItem("bytesPerTexel",r.toString()));f.value=r.toString();f.addEventListener("input",()=>{r=parseInt(f.value),window.localStorage.setItem("bytesPerTexel",r.toString()),p()});document.getElementById("lastMBytes").innerText=parseInt(window.localStorage.getItem("achievedBytes"))/1024/1024+" MB";const s=1024*3,c=1024*3,y=document.createElement("canvas");y.width=s;y.height=c;const S=y.getContext("2d"),h=document.getElementById("canvas");h.width=s;h.height=c;const e=h.getContext("webgl2");function p(){const g=l*1024*1024,a=Math.floor(g/(s*c*r)),d=a*s*c*r;u("Setup "+r+" bytes per texel, "+a+" textures, target "+d/1024/1024+" MB, width "+s+", height "+c);const i=S.createImageData(s,c);function t(){for(let n=0;n<i.height*i.width;n++)i[n]=Math.floor(Math.random()*256)}async function o(){E=performance.now();let n=0;const T=1024*1024*100;let B=0,I=0;function w(){if(I>=a){u("Done");return}const x=e.createTexture();switch(e.bindTexture(e.TEXTURE_2D,x),t(),r){case 1:e.texImage2D(e.TEXTURE_2D,0,e.ALPHA,s,c,0,e.ALPHA,e.UNSIGNED_BYTE,i);break;case 2:e.texImage2D(e.TEXTURE_2D,0,e.RGBA,s,c,0,e.RGBA,e.UNSIGNED_SHORT_4_4_4_4,i);break;case 4:e.texImage2D(e.TEXTURE_2D,0,e.RGBA,s,c,0,e.RGBA,e.UNSIGNED_BYTE,i);break;default:throw new Error("Invalid bytesPerTexel")}n+=s*c*r,n-B>T&&(u("Allocated "+n/1024/1024+" MB"),B=n),window.localStorage.setItem("achievedBytes",n.toString()),I++,requestAnimationFrame(w)}w()}document.getElementById("startButton").onclick=o}p();function u(g){const a=Math.ceil(performance.now()-E);console.log(a,g);const d=document.getElementById("log");d.innerHTML=`${a} ${g}
${d.innerHTML}`}