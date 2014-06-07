// ==UserScript==
// @name           Start Seiten Hider
// @version        0.4
// @include       http://schuelerVZ.net/Start*
// @include       http://*.schuelerVZ.net/Start*
// @include       http://studiVZ.net/Start*
// @include       http://*.studiVZ.net/Start*
// @include       http://meinVZ.net/Start*
// @include       http://*.meinVZ.net/Start*
// ==/UserScript==
var a;
var g;
var n;
document.getElementById('Grid-Navigation-Main').innerHTML += "<li class='clearFix'><div id='BuschFunkHider'><a href='#'class='left' title='BuschFunkHider'>Buschfunk</a></div></li><li class='clearFix'><div id='GruschelHider'><a href='#' class='left' title='GruschelHider'>Gruscheln</a></div></li><li class='clearFix'><div id='NewHider'><a href='#'class='left' title='NewHider'>Neuigkeiten</a></div></li>";
document.getElementById('BuschFunkHider').addEventListener('click',function(){OnOffbf();},false);
document.getElementById('GruschelHider').addEventListener('click',function(){OnOffg();},false);
document.getElementById('NewHider').addEventListener('click',function(){OnOffn();},false);
window.setInterval(function(){a = checkbf();},100);
window.setInterval(function(){g = checkg();},100);
window.setInterval(function(){n = checkn();},100);
window.setInterval(function(){makebf();},100);
window.setInterval(function(){makeg();},100);
window.setInterval(function(){maken();},100);
function OnOffbf(){
if(!a){a=false;GM_setValue('BuschFunkHider',a);}
if(a == true){a=false;GM_setValue('BuschFunkHider',a);}
else if(a == false){a=true;GM_setValue('BuschFunkHider',a);}
}
function OnOffg(){
if(!g){a=false;GM_setValue('GruschelHider',a);}
if(g == true){a=false;GM_setValue('GruschelHider',a);}
else if(g == false){a=true;GM_setValue('GruschelHider',a);}
}
function OnOffn(){
if(!n){n=false;GM_setValue('NewHider',n);}
if(n == true){n=false;GM_setValue('NewHider',n);}
else if(n == false){n=true;GM_setValue('NewHider',n);}
}
function checkbf(){
var a = GM_getValue('BuschFunkHider');
return a;
}
function checkg(){
var g = GM_getValue('GruschelHider');
return g;
}
function checkn(){
var n = GM_getValue('NewHider');
return n;
}
function makebf(){
if(a == true){document.getElementById('Mod-Feeds-Snipplet').style.display="none";}
else if(a == false){document.getElementById('Mod-Feeds-Snipplet').style.display="block";}
}
function makeg(){
if(g == true){document.getElementById('Gruscheln_Overview').style.display="none";}
else if(g == false){document.getElementById('Gruscheln_Overview').style.display="block";}
}
function maken(){
if(n == true){document.getElementById('news_staticContent').style.display="none";}
else if(n == false){document.getElementById('news_staticContent').style.display="block";}
}