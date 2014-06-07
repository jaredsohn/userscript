// ==UserScript==
// @name		Hide Election2008 banner on Twitter
// @version 	1
// @author		PhilHawksworth
// @include		http://twitter.com/home
// ==/UserScript==
var h1s = document.getElementsByTagName('h1');
for (var h=0; h < h1s.length; h++) {
	if(h1s[h].className.indexOf('elections-promotion') !== -1) {
		h1s[h].style.display = "none";
		break;		
	}
};