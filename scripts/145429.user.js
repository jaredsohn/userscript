// ==UserScript==
// @name			autorefresher
// @description		if service is unavailable try again
// @author			yzbasbug
// @namespace      	http://userscripts.org/users/useridnumber
// @include			*
// @version			1.0
// ==/UserScript==
function checkAndRefresh() {
	var str = document.getElementsByTagName('Body')[0].innerHTML
	var patt = /unavailable/g;
	var result = patt.test(str);
	if (result) {
		document.write("sayfaya ulasilamiyor 10 sn sonra otomatik tekrar yüklenecek");
		setTimeout(function(){location.reload();},10000)
	}
}
//document.addEventListener('DOMNodeInserted', checkAndRefresh ,false);
window.addEventListener('load', checkAndRefresh, false);
