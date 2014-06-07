// ==UserScript==
// @name           Top list show first in check*pad
// @namespace      http://ashphy.s268.xrea.com/
// @description    Top list in check*pad automatically open, first.
// @include        http://www.checkpad.jp/?
// ==/UserScript==

(function() {
	//check referrer
	//If refer is checkpad, on operation.
	if(!document.referrer.match("www.checkpad.jp"))
	{
		topListLink = document.getElementById("leftside").childNodes[3].childNodes[1].childNodes[1];
		document.location = topListLink.href;
	}
})();

