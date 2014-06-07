
// PoFo Annoying People Blocker user script
// version 0.1 BETA!
// 2008-11-03
// By Kiroff the Venerable
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          PoFo Annoying People Blocker
// @namespace     http://www.politicsforum.org/forum/viewtopic.php*
// @description   delete posts of people you don't like
// @include       *
// ==/UserScript==


   // Get stored hidden users from array
  
	 var users = new Array("Kumatto", "smallpox");


window.addEventListener(
    'load', 
    deletePosts(),
    true);


	
function deletePosts() {
	var rows;
	rows = document.evaluate(
    "//*[@class='genmed']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	for (var i = 0; i < rows.snapshotLength; i++) {
       		 var row = rows.snapshotItem(i);
		var text = row.innerHTML;
		
		for (x in users) {
			
       		 	if (text.search(users[x].toString()) > -1) {

           	     row.parentNode.parentNode.parentNode.parentNode.removeChild(row.parentNode.parentNode.parentNode);
     		 	 }
	}

}
}