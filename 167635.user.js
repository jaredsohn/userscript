// ==UserScript==
// @name        pageTurner
// @namespace   hr.frenky
// @include     http://www.bug.hr/master/babes/*
// @version     1
// ==/UserScript==

window.AddKeyWatchers=function(){
  document.onkeydown = checkKey;
}

function getHref(id) {
	var element=document.getElementById(id);
    if (element != null) {
	  return element.href;
	}
	return null;
}

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
         // left arrow
         var hrefPrethodna=getHref("ctl00_ctl00_MainContent_Stupac1_oDanPrije2");
         window.location = hrefPrethodna;
    } else if (e.keyCode == '39') {
         // right arrow
         var hrefSljedeca=getHref("ctl00_ctl00_MainContent_Stupac1_oDanPoslije2");
   	     window.location = hrefSljedeca;
    }
}

AddKeyWatchers();
