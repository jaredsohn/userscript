// version 20070522
//	fix for "bannerless" pages
// version 20070516
// 	first version
// ==UserScript==
// @name          Empornium Retitler
// @namespace     http://userscripts.org
// @description   retitles empornium.us torrent detail pages
// @include       *empornium.us/details.php?*
// @exclude       http://forums.empornium.us/*
// ==/UserScript==
allCenterElem=document.getElementsByTagName('center');
if (allCenterElem[1].innerHTML.match(/banner/gmi)){
	document.title = allCenterElem[2].textContent + " on " + document.title;
}
else {
        document.title = allCenterElem[1].textContent + " on " + document.title;
}

