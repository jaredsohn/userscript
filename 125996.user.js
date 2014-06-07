// ==UserScript==
// @name          Razor1911 - Kaskus
// @namespace     http://facebook.com/suryawidi
// @description	  Razor1911 Dancing Pirate on Kaskus.us
// @include       http://*.kaskus.us/*
// @exclude       http://www.kaskus.us/member.php?*
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+0px";
	div.style.right = "+0px";
        div.innerHTML = "<img src=\"http://cdn-u.kaskus.us/71/zvoxpphs.gif\"></img>"

	body.appendChild(div);
}