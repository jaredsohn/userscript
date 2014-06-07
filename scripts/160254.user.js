// ==UserScript==
// @name        Card Gallery
// @namespace   http://www.urban-rivals.com
// @description Unlock gray images >:)
// @include     http://www.urban-rivals.com*/characters/?id_perso=*
// @version     1
// @copyright   Copyright (c) 2013 Ivan Lay
// ==/UserScript==
function grayout() {
	var elems = document.getElementsByTagName('img');
	for (i=0;i<elems.length;i++) {
		if ((' ' + elems[i].className + ' ').indexOf(' cardNewPict ')
				> -1) {
			j=elems[i].src.indexOf("_GRAY");
			if (j>-1)
				elems[i].src=elems[i].src.replace("_GRAY","");	
		}
	}
}

var h2 = document.getElementsByTagName("h2");
h2[0].innerHTML="<a href='#' title='Click to unlock gray images >:)\n-= GM Script by XGrimBladeX 2013 =-'>"+h2[0].innerHTML+"</a>";
h2[0].onclick=grayout;
