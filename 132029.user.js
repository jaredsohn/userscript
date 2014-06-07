// ==UserScript==
// @name           Slavehack Bank Account Login Continue
// @include        *slavehack*index2.php?page=internet&var2=135.132.154.124&crackbank=1
// @include        *slavehack*index2.php?page=internet&var3=135.132.154.124&NUMBER=*&crackbank=1
// @version                1.0
// ==/UserScript==
var allA = document.getElementsByTagName('a');
for (var i = 0; i < allA.length; i++) {
	if ( allA[i].innerHTML.match('Try again') ) {
		window.location.href = allA[i].href;
	}
}