// ==UserScript==
// @name			Add The "I'm Feeling Lucky" Button To Google Searches
// @author			Erik Vold
// @namespace		googleAddImFeelingLuckyBtn
// @include			http://google.com/*
// @include			http://www.google.com/*
// @include			http://google.ca/*
// @include			http://www.google.ca/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-11-13
// @lastupdated		2009-11-14
// @description		This userscript adds the "I'm Feeling Lucky" button to Google searches.
// ==/UserScript==

(function(){
	var btnG=document.getElementsByName('btnG')[0];
	if(!btnG) return;
	var btnI=document.getElementsByName('btnI')[0];
	if(btnI) return;
	btnI=document.createElement("input");
	btnI.name="btnI";
	btnI.type="submit";
	btnI.value="I'm Feeling Lucky";
	btnI.setAttribute("class","lsb");
	btnI.setAttribute("onclick","this.checked=1");
	btnG.parentNode.insertBefore(btnI,btnG.nextSibling);
})();