// ==UserScript==
// @name           festzeit.ch forward to profile after message
// @namespace      festzeit.ch forward to profile after message
// @include        http://www.festzeit.ch/memmsg.php*
// ==/UserScript==


var all_divs=document.getElementsByTagName("div");

for(var i=0; i< all_divs.length; i++)
	if(all_divs[i].innerHTML=="Deine Nachricht wurde abgeschickt!")
		document.location.href="http://www.festzeit.ch/member.php";