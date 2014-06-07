// ==UserScript==
// @name           Old LG Homepage
// @namespace      1
// @include        http://landgrab.net/landgrab/Home
// ==/UserScript==

make_3_11_1();

function make_3_11_1(){
	var section = document.getElementById("active_games_column_div1");
	var divs = section.firstChild;
	while(divs = divs.nextSibling){
		if(!divs.tagName) continue;
		var tag = divs.tagName.toLowerCase();
		if(tag != 'div') continue;
		if(divs.id.substring(0,8) != 'game_div') continue;
		divs.removeAttribute('onclick');
		divs.removeAttribute('onmouseover');
		divs.removeAttribute('onmouseout');
		if(divs.className.substring(divs.className.length-2,divs.className.length) == "_s"){
			divs.className = divs.className.substring(0,divs.className.length-2);
		}
	}
}
