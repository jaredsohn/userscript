// ==UserScript==
// @name          Glitch Nearest Feature
// @namespace     http://www.glitch.com/profiles/PM1VKLODAL12V1E/
// @description   Set your destination to the closest location with a specific feature.
// @include       http://www.glitch.com/locations/*
// ==/UserScript==
try{
	var loc = window.location.href;
	loc = loc.replace(/http:\/\/www\.glitch\.com\/locations\//, "");
	loc = loc.replace(/\//, "");
	if (loc) {
		var isdone=0;
		var headers = document.getElementsByTagName('div');
		for (i=0; i<headers.length; i++) {
			if (!isdone) {
				// find the div containing Map routing and add the new section after that
				var div = headers[i].innerHTML;
				if (div.search(/<h3>Map routing/) != -1) {
					isdone = 1;
					var ins = document.createElement('div');
					ins.className = "section label-section";
					// load the nearby data fully formed
					GM_xmlhttpRequest({
					  method: "GET",
					  url: "http://www.tagurls.com/glitch/?nearest="+loc,
					  onload: function(response) {
						ins.innerHTML = response.responseText;
					  }
					});
					headers[i].appendChild(ins);
				}
			}
		}
	}
}
catch(e){};