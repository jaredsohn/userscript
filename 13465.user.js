// ==UserScript==
// @name          ORKUT CUPCAKE in ur profile name
// @description   usd 4 gettin a CUP-CAKE in ur prof name like this one http://www.orkut.com/Profile.aspx?uid=14560501597755531052
// @author          abhishek
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_cupcake.gif''>";	
}
		