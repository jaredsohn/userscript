// ==UserScript==
// @name          Orkut star in ur profile name by don of computer
// @description   usd 4 gettin a star in ur prof name like this one http://www.orkut.co.in/Main#Profile.aspx?rl=mp&uid=18116120421291649457
// @author          Don of computer
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_badge.gif''>";	
}
			