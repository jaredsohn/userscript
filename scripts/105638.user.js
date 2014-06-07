// ==UserScript==
// @name           Slavehack Process Log Protector
// @include        *slavehack*index2.php?page=internet&openFolder=&var3=files&aktie=*&*=*
// @version                1.0
// ==/UserScript==
var allA = document.getElementsByTagName('a');
for (var i = 0; i < allA.length; i++) {
	if ( allA[i].innerHTML.match('Access logfile') ) {
		window.location.href = allA[i].href;
	}
}