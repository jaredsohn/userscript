// ==UserScript==
// @name 10 minuten button beim moin moin 
// @namespace http://pennnergame-basti1012.foren-city.de basti1012
// @description Fuegt oberhalb des Status Anzeige de 10 Minuten Sammel Button hzinzu
// @include http://*pennergame.de/*
// @include http://*pennergame.de/news/
// ==/UserScript==

var VonOben = 78; //px
var VonRechts = 242; //px
var div = document.getElementById('footer');
var navi = div.getElementsByTagName('li')[6];
function fclick(ev) {
GM_setValue("fsave","true")
top.location.href= '/activities/';
}/*     
fbutton = document.createElement("input");
fbutton.type = 'button';
fbutton.value = '10 minuten sammeln';
fbutton.addEventListener('click',fclick,false);
navi.appendChild(fbutton);
*/
   fbutton = document.createElement("input");
   fbutton.type = 'button';
   fbutton.value = '10 minuten sammeln';
   fbutton.addEventListener('click',fclick,false);
   fbutton.setAttribute('id', 'news_info');
   fbutton.setAttribute('name', 'news__info');
   fbutton.setAttribute('align', 'left');
   fbutton.setAttribute('style', 'position:absolute;top:'+VonOben+'px;right:'+VonRechts+'px;');
   var navigation = document.getElementById("navigation");
   navi.appendChild(fbutton);


var fnow = GM_getValue("fsave", "false");
if (fnow  == "true")
{
var fnow = "false";
GM_setValue("fsave", "false");	
var finputButton = document.getElementsByName("Submit2")[0];
finputButton.click();
}
// Copiright By Basti1012
