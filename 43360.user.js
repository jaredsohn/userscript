// ==UserScript==
// @name           raceButton
// @namespace      http://apps.facebook.com/fluff/
// @description    Have a race button on the bottom right corner of window
// @include        http://apps.facebook.com/fluff/fluffrace.php
// ==/UserScript==
if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Welcome to a (fluff)Race challenge") > 0) {
	var blk = document.createElement("div");
	blk.style.zIndex="100";
	blk.style.position="fixed";
	blk.style.left="300px";
	blk.style.bottom="70px";
	//blk.style.border="
	blk.innerHTML = "<input type=\"button\" value=\"Let's Race\" onClick=\"document.forms[1].submit();\">";
	document.getElementsByTagName("body")[0].appendChild(blk);
}