// ==UserScript==
// @id             vfinder
// @name           Valenth Finder
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    Now your Valenth pets have nowhere to hide!
// @version        1.02
// @include        http://www.valenth.com/*
// @include        http://valenth.com/*
// ==/UserScript==


GM_addStyle("img.Valenthpet { display: inline-block; height: 110px; width: 110px; border: 1px dashed sienna !important; }");
GM_addStyle("a:visited img.Valenthpet { border: 1px dashed #A88F52 !important; }");

petlist = document.getElementsByTagName("img");

for (i in petlist) {
	if (/(valenth\.com)?\/lab\/[0-9]+\.png/.test(petlist[i].src)) {
		petlist[i].className = 'Valenthpet';
		
		if (petlist[i].naturalWidth == 0 && petlist[i].naturalHeight == 0) {
			petlist[i].src = petlist[i].src.replace('lab','view');
		}
	}
}