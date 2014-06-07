// ==UserScript==
// @name           opendirectory full name
// @namespace      http://jobson.us
// @description    Shows full file name in directory listings.
// @include        http://localhost/
// ==/UserScript==

// Written by request from:
// http://www.reddit.com/r/opendirectories/comments/dxpjc/question_is_there_a_script_to_override_the/

var a = document.getElementsByTagName('a');

for (var i=0;i<a.length;i++) {
	// Apache appends a .. elipsis on truncated file names
	if (/\.\./.test(a[i].innerHTML)) {
		var fullName = '';
		
		if (/\/$/.test(a[i].href)) {
			// Path
			fullName = unescape(a[i].href.match(/.+\/(.+?)\/$/)[1]);
		} else {
			// File
			fullName = unescape(a[i].href.match(/.+\/(.+)$/)[1])
		}
		
		a[i].innerHTML = fullName +"\t\t";
		
	}
}
