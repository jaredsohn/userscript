// ==UserScript==
// @name	/r/SCP linkify SCP's
// @namespace	http://userscripts.org/users/82332
// @include	http://*.reddit.com/r/SCP/*
// @version	1.1
// @grant	none
// ==/UserScript==

var par = document.querySelectorAll(".comment .md p, .entry .md p");

for(i = 0; i < par.length; i++) {
   var t = par[i].childNodes;
	
	for(j = 0; j < t.length; j++) {
	
		if(t[j].nodeType == 3 && t[j].parentNode.nodeName != 'A') {
			var clone = document.createDocumentFragment();
			var cloneText = t[j].cloneNode(true);
			clone.appendChild(cloneText);
			
			var text = t[j].nodeValue;
			var re = /(?:SCP[- ])?(\d{3,4})(-d|-arc|-ex|-j)?/gi;
			var lastIndex = 0;
			
			while (m = re.exec(text)) {
				cloneText.splitText(m.index - lastIndex);
				cloneText.nextSibling.splitText(m[0].length);
				
				var prefix = "";
				if(m[2] == "-d") {
					prefix = "decomm:";
				}
				
				var suffix = "";
				if(typeof(m[2]) != "undefined") {
					suffix = m[2];
				}
				
				var n = document.createElement("a");
				n.setAttribute("href", "http://scp-wiki.wikidot.com/" + prefix + "scp-" + m[1] + suffix);
				n.appendChild(cloneText.nextSibling);
				clone.insertBefore(n, cloneText.nextSibling);
				
				cloneText = n.nextSibling;
				
				lastIndex = re.lastIndex;
			}
			
			t[j].parentNode.replaceChild(clone, t[j]);
		}
	}
}