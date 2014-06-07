// ==UserScript==
// @name           Serious Discussion is 100% Harmless
// @namespace      lansen
// @description    Replaces "Mostly Harmless" with Serious Discussion on Board/Topic List
// @include        http://boards.endoftheinter.net/boardlist.php
// @include        http://boards.endoftheinter.net/showtopics.php?board=58
// @include        http://boards.endoftheinter.net/showmessages.php?board=58&*
// @include        http://boards.endoftheinter.net/history.php
// ==/UserScript==

var url = document.location.toString();
if(url.length == 45){
	document.getElementsByTagName('table')[0].rows[4].getElementsByTagName('a')[0].innerHTML = 'Serious Discussion';
}
if(url.length == 55){
	document.title = 'Serious Discussion';
	document.getElementsByTagName('h1')[0].innerHTML = 'Serious Discussion';
}
if(url.length > 58){
	document.getElementsByTagName('h1')[0].innerHTML = 'Serious Discussion';
}
if(url.length == 43){
	var table = document.getElementsByTagName('table')[0];
	for(i = 1; i<table.rows.length; i++){
		if(table.rows[i].cells[0].innerHTML == 'Mostly Harmless'){
			table.rows[i].cells[0].innerHTML = 'Serious Discussion';
		};
	}
}