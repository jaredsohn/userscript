// ==UserScript==
// @name          Yahoo Mail Classic Direct To Inbox
// @namespace     http://moppy.4free.co.il
// @description	  Opens the inbox directly. Motty Katan(c) 20-02-2010 last updated 20-02-2010
// @include       http://*.mail.yahoo.com/mc/welcome?*
// ==/UserScript==
//Change Log:


//if Yahoo Mail Classic!
if (!window.kPartner){
	location.href = document.getElementById("inbox").childNodes[0].href;
}