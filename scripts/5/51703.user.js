// ==UserScript==
// @name           FB Usernames
// @namespace      Oatzy
// @description    For people who have chosen their FB user name, it replaces their real name (on the home page) with their username.
// @include        http://www.facebook.com*
// ==/UserScript==

(function() {

var adr = document.getElementsByTagName("Span");
//var patt1 = new RegExp("^(http://www.facebook.com/)", "g");
var patt2 = new RegExp("([^/][?]ref=[mn]f)$", "g");

for (var i=0; i<adr.length; i++) {
	if (adr[i].hasChildNodes()) {
		adr1 = adr[i].childNodes[0].toString();
		if (patt2.test(adr1)) {
			adr[i].childNodes[0].innerHTML = adr1.substring(24, adr1.indexOf("?"));
		}
	}
}

})();