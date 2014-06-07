// ==UserScript==
// @name           ▶ Play
// @description    Adds a ▶ if you listen to a channel
// @include        http://*.di.fm/*
// @version        1.0
// @author	   René Filip
// ==/UserScript==


function mycode() {
	try {
		if(document.getElementById('ctl-play').getAttribute('class')) {
			if(document.getElementById('ctl-play').getAttribute('class') == "pause") {
				document.title = "▶ "+document.title;
			}
			document.getElementById('ctl-play').setAttribute('onclick', 'document.title = ((document.title.indexOf("▶") != -1) ? document.title.substr(2, document.title.length) : "▶ "+document.title) ');      
		} else {
			window.setTimeout(mycode, 1000);
		}
	} catch(e) {
	}
}

console.log("Userscript ▶ Play gestartet");
mycode();