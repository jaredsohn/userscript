
// version 0.1 BETA!
// 2008
// Copyright (c) Jo Bench
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
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
// @name          Multiple Url Removal from Google
// @namespace     http://www.google.com
// @description   Allow you to submit in Google removal tool several urls (up to 100 by 100) 
// @include       https://www.google.com/webmasters/tools/wm?action=create&siteUrl=http%3A%2F%2Fwww.*.*%2F&hl=en&type=i&next=Next+%C2%BB
// ==/UserScript==

window.addEventListener(
	'load',
	function() { init() },
	true
);

function init() {
	var navbar, newElement;
	navbar = document.getElementById('url_entry');
	if (navbar) {
		newElement = document.createElement('div');
		newElement.innerHTML = "<textarea id='webtoolUrlTextArea' style='width: 500px; height: 200px;'>example.html\ncategory/page.html\ncategory2/page.html</textarea><a style='cursor: pointer;' id='myGoogleWebmasterFunctionLink'>Start</a><br/><br/>";
		
		navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
	}

	var links = document.getElementById('myGoogleWebmasterFunctionLink');
	links.addEventListener('click', webtoolAlert,false);
}


function webtoolAlert() {
	var webtoolUrlArray = new Array();
	var text = document.getElementById('webtoolUrlTextArea').value.replace(/\s+$/g,"");
	var webtoolUrlArray = text.split("\n");
	for (webtoolGooleIt = 0; webtoolGooleIt < webtoolUrlArray.length; webtoolGooleIt++) {
		setTimeout('document.getElementById("urlInput").value = "'+webtoolUrlArray[webtoolGooleIt]+'"; handleAddClick();document.getElementById("webtoolUrlTextArea").value = "Done!";' , 60);
	}
}
