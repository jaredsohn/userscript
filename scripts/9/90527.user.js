// ==UserScript==
// @name           Skip Bleachportal download timer
// @namespace      http://www.w3.org/1999/xhtml
// @description    Skips Bleachportal download timer
// @include        *bleachportal.net/dl.php*
// ==/UserScript==

try {
	document.getElementById("downloadlink").style.display = "inline";
	document.getElementById("timer").style.display = "none";
	
	a = document.getElementsByTagName("a");
	for(r=0;r<=a.length;r++) {
		if(r==1) {
			ax = a[r];
			window.location=ax.href;
		}
	}

} catch(e) { alert(e.description) }