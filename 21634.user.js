// ==UserScript==
// @name           Wowhead to Buffed Links
// @description    Adds a link to wow.buffed.de
// @namespace	   http://dani.tac-ops.net// @include        http://www.wowhead.com/?item=*
// @include        http://www.wowhead.com/?quest=*
// @include        http://www.wowhead.com/?itemset=*
// @include        http://www.wowhead.com/?npc=*
// @include        http://www.wowhead.com/?object=*
// @include        http://www.wowhead.com/?spell=*
// @include        http://www.wowhead.com/?faction=*
// @include        http://www.wowhead.com/?zone=*
// ==/UserScript==

var key='', id='';
if( location.href.match(/item=(\d+)/) ) {
	id = location.href.match(/item=(\d+)/)[1];
	key = '?i=';
} else if ( location.href.match(/quest=(\d+)/) ) {
	id = location.href.match(/quest=(\d+)/)[1];
	key = '?q=';
} else if ( location.href.match(/itemset=(\d+)/) ) {
	id = location.href.match(/itemset=(\d+)/)[1];
	key = 'blasc/50/ruestungssets?set=';
} else if ( location.href.match(/npc=(\d+)/) ) {
	id = location.href.match(/npc=(\d+)/)[1];
	key = '?n=';
} else if ( location.href.match("/object=(\d+)/") ) {

} else if ( location.href.match("/spell=(\d+)/") ) {

} else if ( location.href.match(/faction=(\d+)/) ) {
	id = location.href.match(/faction=(\d+)/)[1];
	key = 'blasc/90/von-fraktionen?f_id=';
} else if ( location.href.match("/zone=(\d+)/") ) {

}

if( key != '' ) {
	
	var box = document.getElementById("main-contents");
	box = box.getElementsByTagName("table")[0];
	//box = box.firstChild;

	var buffed_tr = document.createElement("tr");
	var buffed_td = document.createElement("td");
	buffed_td.setAttribute("align", "center");
	var buffed_link = document.createElement("a");
	buffed_link.setAttribute("href", "http://wow.buffed.de/" + key + id);
	var buffed_text = document.createTextNode("Buffed");
	buffed_link.appendChild(buffed_text);
	buffed_td.appendChild(buffed_link);
	buffed_tr.appendChild(buffed_td);
	box.appendChild(buffed_tr);
}


