// ==UserScript==
// @name           NGOQH - Ad Hider
// @namespace      www.userscript.org/sripts/show/71126
// @description    Removes ads from NGOHQ after they have been loaded
// @date           2011-11-03
// @creator        mkey
// @include        http://www.ngohq.com/*
// ==/UserScript==

	var ins= document.getElementsByTagName('ins');
	for (var i=0; i<ins.length; i++) ins[i].style.display='none';
	
	