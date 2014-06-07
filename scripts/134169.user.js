// ==UserScript==
// @name        phpBB List as Index
// @namespace   phpBB mod
// @include     
// @version     1
// ==/UserScript==

var lists = document.getElementsByTagName('ul');
var entries = new Array();

var i;
var j;
//Get all entries of all lists
for (i = 0; i < lists.length; i++) {
	entries[i] = lists[i].innerHTML.split('\n<br>\n');
}

//Iterate each entry of everylis
for (i = 0; i < entries.length; i++) {
	for (j = 0; j < entries[i].length; j++) {
		//Apply Hyperlink
		lists[i].innerHTML = lists[i].innerHTML.replace(entries[i][j],
			'<a href="#' + entries[i][j] + '">' + entries[i][j] + '</a>');
			
		//Apply names
		document.body.innerHTML = document.body.innerHTML.replace('-' + entries[i][j] + '-',
			'<a name="' + entries[i][j] + '">' + entries[i][j] + '</a>');
	}
}