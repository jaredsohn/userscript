// ==UserScript==
// @id             uploaded.net-8c688a90-3234-449c-877e-13d1842f7df7@vady-fork
// @name           uploaded.net anti-timer, mod for Opera 10-12
// @version        1.0
// @namespace      http://userscripts.org/scripts/show/156995
// @author         Black_Sunlight
// @include        http://uploaded.net/file/*
// ==/UserScript==

(function() {

	window.opera.addEventListener('BeforeExternalScript', function(e) {
		if(e.element.getAttribute('src').match(/(onclickads\.net|propellerpops\.com)/i)) {
			e.preventDefault();
			e.stopPropagation();
		}
	}, false);

	var http = new XMLHttpRequest();
	http.open("POST", "/io/ticket/slot/" + location.href.split("/")[4], true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	///http.setRequestHeader("Content-length", 0);
	http.setRequestHeader("Connection", "close");
	http.send();

	window.opera.addEventListener("AfterEvent.DOMContentLoaded", function() {
		window.Download.freeslot = true;
		window.Download.captcha();
		// remove clickads
		window.setAttribute("onclick", null); // document.getElementsByTagName('html')[0].setAttribute("onclick", null);
	}, false);

})();