// ==UserScript==
// @name          ORKUT star in ur profile name
// @description   usd 4 gettin a star in ur prof name like this one http://www.orkut.com/Profile.aspx?uid=17394878865899831263
// @author          abhishek
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_badge.gif''>";	
}
			