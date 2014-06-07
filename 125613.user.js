// ==UserScript==
// @name           	BW-Hide-Messages
// @namespace           http://brokenworlds.com
// @description	    Makes ignore function to BW chat
// @author        	MasterClass
// @include         http://*.brokenworlds.com/main.php
// @include         http://brokenworlds.com/main.php
// @version         0.0.1
// ==/UserScript==

function onLoad()
{
        alert("works!");
	divs=window.frames[1].document.getElementsByTagName('div');
	for (i=0; i<divs.length; i++) {
		if (divs[i].getAttribute("uid")=='1292363') {
			divs[i-1].style.display='none';
			divs[i].style.display='none';
			divs[i+1].style.display='none';
		}
	}
}
window.addEventListener("load", onLoad, false);
window.addEventListener("mousemove", onLoad, false);