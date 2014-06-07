// ==UserScript==
// @name           Filtr JoeMonster
// @description    Usuwa z listy forum tematy niechcianych osób
// @include        http://www.joemonster.org/phorum/*
 
// ==/UserScript==
/******************************************
 
 v0.0.1 - Wersja testowa
 
 *******************************************/

var users = []; // tu wstawiamy nicki, np.: ["nick1", "nick2", "nick3"]

var table = document.getElementById("forum_list").firstChild.nextSibling.nextSibling;
var needle;
for (x in users) {
	var rowCount = table.rows.length;
	for(var i= rowCount - 1; i >= 0; i--) {
	    var row = table.rows[i];
	    if (row.cells[2].textContent) {
	    	needle = row.cells[2].textContent;
	    } else {
		needle = row.cells[2].innerText;
	    }
	    if(needle.indexOf(users[x])!=-1) {
	    	table.deleteRow(i);
	    }
	}
}