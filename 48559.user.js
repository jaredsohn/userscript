// ==UserScript==
// @author		   Maccius
// @name           ElBruto Exp Viewer
// @namespace      ElBrutoExpViewer
// @description    Permite ver la experiencia que tienes en ElBruto
// @include        http://*.elbruto.es/cellule
// ==/UserScript==
var levelInfo=document.getElementsByClassName('level');
var levelBarContainer = levelInfo[0].getElementsByTagName('div');
var levelBar=levelBarContainer[1];
var lExp=levelInfo[0].innerHTML.indexOf('style="width: ');
var uExp=levelInfo[0].innerHTML.indexOf(' class="levelBar"');
var percent=parseFloat(levelInfo[0].innerHTML.substr(lExp+14, uExp-lExp-16)).toFixed(2);
levelBar.style.height='15px';
levelBarContainer[2].style.height='13px'
levelBar.innerHTML='<div style="position: relative; left: 2px; top: 7px;font-size:small;color:#00a814;z-index:1;vertical-align:bottom;text-decoration:none;">'+percent+'%</div>'+levelBar.innerHTML;