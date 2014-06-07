// ==UserScript==
// @name           infinitumFail
// @namespace      infinitumFail
// @description    Problemas de conexión de Infinitum
// @include        http://dsldevice.lan/*
// ==/UserScript==

window.setTimeout (backHistory, 10000);

function backHistory () {
	popup (100, 100, 500, 275, "<br><center>Infinitum esta experimentando problemas</center></br><br><center>Se reconectará en 15 segundos</center></br>");
	window.setTimeout ( function() { reloadKOC(); }, 15000);
}

function reloadKOC () {
	history.go(-1);
}

function popup (left, top, width, height, content){
   var div = document.createElement('div');
   if (width)
       div.style.width = width;
   if (height) 
       div.style.height = height;
   if (left || top) {
       div.style.position = "relative";
       if (left)
           div.style.left = left;
       if (top)
           div.style.top = top;
   }
   if (content)
       div.innerHTML = content;
       
  div.style.background = "#ffc";
  div.style.border = "2px solid #000";
  div.style.zIndex = "336699";        // KOC modal is 100210 ?
  div.style.display = 'block';
  window.document.body.insertBefore(div, window.document.body.childNodes[0]);
  return div;
}
