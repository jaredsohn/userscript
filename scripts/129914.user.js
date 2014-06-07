// ==UserScript==
// @author 	   Gwindow
// @name           WhatBookmarkNotes
// @description    Adds notes to bookmarks on what.
// @namespace      http://userscripts.org
// @include        *what.cd/bookmarks.php?type=torrents*
// ==/UserScript==


var links_in_row = document.evaluate( ".//a[starts-with(text(),'Remove Bookmark')]"
          , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var i = 0;
while( (link = links_in_row.snapshotItem(i) ) != null) {
   var s = String(link).split("group_");
   var id = parseFloat(s[1]);

   take = document.createElement('a');
   take.setAttribute("href", "#null");
   take.setAttribute("id", id);
   take.addEventListener("click", function() {takeNotes (this.id)}, false);   
   take.appendChild(document.createTextNode("Take Notes"));
   link.parentNode.insertBefore(take, link.nextSibling);
   link.parentNode.insertBefore(document.createElement('br'), link.nextSibling);
   
   view = document.createElement('a');
   view.setAttribute("href", "#null");
   view.setAttribute("id", id);
   view.addEventListener("click", function() {viewNotes (this.id)}, false);   
   view.appendChild(document.createTextNode("View Notes"));
   link.parentNode.insertBefore(view, link.nextSibling);
   link.parentNode.insertBefore(document.createElement('br'), link.nextSibling);
   
   i++;
}


function takeNotes(id) {
	var old_notes = "";
	var value = GM_getValue(id);
	if(value != null && value.length > 0) {
		old_notes = value;
	}
	var new_notes = prompt("Take Notes", old_notes);
	
		GM_setValue(id, new_notes);
	
}

function viewNotes(id) {
	value = GM_getValue(id);
	if(value != null && value.length > 0) {
		alert(value);
	}
	else {
		alert("No Notes Taken");
	}
}
