// ==UserScript==
// @name           RMT show quota (up minus down) instead of ratio
// @namespace      kalevil.userscripts
// @description    Changes ratio to the downloadable quota
// @include        http://metal.iplay.ro/*
// ==/UserScript==


function searchFirstAttrib(tag,attr, val)
{
var gotit;
imgs=document.getElementsByTagName(tag);
for(idx in imgs)
{
  img=imgs[idx];
  if (img.getAttribute(attr)==val)
  {
   gotit = img;
   break;
  }
}

return gotit;
}

upgb=searchFirstAttrib("img","src", "pic/arrowup.gif").parentNode.nextSibling.nextSibling.innerHTML
downgb=searchFirstAttrib("img","src", "pic/arrowdown.gif").parentNode.nextSibling.nextSibling.innerHTML

var upmul = 1.0;
var downmul = 1.0;
if (upgb[upgb.length-2] == "M")
 upmul = 1.0/1024;
if (downgb[downgb.length-2] == "M")
 downmul = 1.0/1024;

if (upgb[upgb.length-2] == "T")
 upmul = 1024.0;
if (downgb[downgb.length-2] == "T")
 downmul = 1024.0;
 var val = parseFloat(upgb)*upmul-parseFloat(downgb)*downmul;


insertme='<font color="'+(val>0?"green":"red")+'">'+(val).toFixed(2)+' GB</font>'

e=searchFirstAttrib("font","color","#336699");
e.innerHTML=insertme
