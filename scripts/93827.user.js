// ==UserScript==
// @name 天鳳すっ飛び
// @namespace tsunochucchu
// @include http://tenhou.net/0/?log=*
// @include http://tenhou.net/0/?wg=*
// @match http://tenhou.net/0/?log=*
// @match http://tenhou.net/0/?wg=*
// @version 1.0.1
// ==/UserScript==

(function(){
	var url = window.location.href;
	if (url.substr(-5) != "&js=1") {
		var td = document.getElementsByTagName("td")[1];
		url = url.replace("tenhou.net/0/", "tenhou.net/0/splash.swf");
		td.innerHTML = "<iframe width=100% height=100% frameborder=0 src='" + url + "'></iframe>";
	}
})();