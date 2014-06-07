
// Get TinyURL String
// version 0.1
// 2007-09-23
// (c) 2007 atsushi tsunoda
// released under the GPL licence
// http://www.gnu.org/copyleft/gpl.html

// -------
// This is a Greasemonkey (http://greasemonkey.mozdev.org/) script for FireFox (http://www.firefox.com/) browser.
// When you create a tiny URL (http://tinyurl.com/) by the browser, then you'll get a URL string
// formed of javascript prompt dialog. It's so easy to copy the URL string without PC mouse :)
// Enjoy it!
// -------

// ==UserScript==
// @name          Get TinyURL String
// @description   Get a TinyURL formed of JavaScript prompt dialog
// @include       http://tinyurl.com/create.php*
// ==/UserScript==

var formNum = document.forms.length;
var urlStr;
var tinyUrlStr;

for (i = 0; i < formNum; i++) {
	var formElementsNum = document.forms[i].elements.length;

	for (j = 0; j < formElementsNum; j++) {
		var elementName = document.forms[i].elements[j].name;
		if (elementName == "tinyurl") {
			tinyUrlStr = document.forms[i].elements[j].value;
		}

		if (elementName == "url") {
			urlStr = document.forms[i].elements[j].value;
		}
	}
}

var urlMsg = prompt("The URL: " + urlStr + " is translated by TinyURL.com. The new simple URL is:", tinyUrlStr);


// ChangeLog
// 2007-09-23 - 0.1 - MAP - released
//