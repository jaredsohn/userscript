// ==UserScript==
// @name           DimKong
// @namespace      dimdimdim
// @description    Dark background
// @include        http://www.kongregate.com/games/*
// ==/UserScript==

function t(){GM_addStyle("#primarywrap,#maingame,body,#subwrap{background:#"+(d?"FFFFFF":"000000")+"!important;}");d=!d;}
var d=false,bar=document.createElement("div");
bar.innerHTML='<button type="button">Lights!</button>';
bar.addEventListener("click",t,false);
var p=[],li=document.getElementsByTagName("li"),r=new RegExp("(^|\\s)spritegame(\\s|$)"),l=li.length,
i=0,j=0;for(;i<l;++i){if(r.test(li[i].className)){p[j]=li[i];j++;}}
p[0].insertBefore(bar,p[0].firstChild);
