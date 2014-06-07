// ==UserScript==
// @name           Slavehack Bank Account Login Continue
// @include        *slavehack*index2.php?var2=*&page=internet
// @version                1.0
// ==/UserScript==
var allA = document.getElementsByTagName('a');
for (var i = 0; i < allA.length; i++) {
	if ( allA[i].innerHTML.match('Continue') ) {
		window.location.href = allA[i].href;
	}
}