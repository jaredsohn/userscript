// ==UserScript==
// @name          BuONotifier
// @namespace     BiggestFox
// @author        BiggestFox
// @description   Добавляет в верхнее меню пункт "Оповещения" и подсвечивает его оранжевым цветом при появлении оных.
// @version       1.0.1
// @license       GNU GPL
// @include       http://otvety.google.ru/*
// @include       http://www.otvety.google.ru/*
// ==/UserScript==

function processGoogleBarNotifications() {
  if ( /otvety\.google\.ru\/otvety/ .test(window.location.href)) {
	if(document.getElementById('gbi4m1')){
	var gbit=document.getElementById('gbom').children[0].children[0].innerHTML;
	if ( /Оповещения/ .test(gbit)) {
	var gbah=document.getElementById('gbom').children[0].children[0].href;
	if(gbit=="Оповещения"){
		var gbel="<li class='gbt'><a href='"+gbah+"' class='gbzt' onmouseover='this.className=\"gbzt gbzt-hvr\"' onmouseout='this.className=\"gbzt\"'><span class='gbtb2'></span><span class='gbts' style='color:lightgrey !important;'>"+gbit+"</span></a></li>";
	} else {
		var gbel="<li class='gbt'><a href='"+gbah+"' class='gbzt' onmouseover='this.className=\"gbzt gbzt-hvr\"' onmouseout='this.className=\"gbzt\"'><span class='gbtb2'></span><span class='gbts' style='color:#FF8000 !important;font-weight:bolder !important;'>"+gbit+"</span></a></li>";
	}
	document.getElementById('gbg').children[2].insertAdjacentHTML("afterBegin", gbel);
	}
	}
  }
}

(function() {
  if (document.readyState == "complete") {
    processGoogleBarNotifications();
  } else {
    window.addEventListener('load', function() { processGoogleBarNotifications(); }, true);
  }
})();