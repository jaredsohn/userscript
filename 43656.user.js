// ==UserScript==
// @name           Close threads
// @namespace      sarah@itamer.com
// @description    closes threads on a vbulletin page
// @include        http://userscripts.org/
// ==/UserScript==

var alltds = document.getElementsByTagName("td");

for (var i=0; i<alltds.length; i++) {
	//alert(alltds[i].className);
	if (alltds[i].className=="smallfont" && alltds[i].firstChild.nodeName == "A") {
		var mytd = alltds[i];
		
		var button = document.createElement("a");
		button.href = "javascript:inlineMod.check_all(true, 1); inlineMod.check_all('invert'); document.forms['inlinemodform'].do.value = 'close'; document.forms['inlinemodform'].submit()"; 

		var image = document.createElement("img");
		image.src = "/images/statusicon/thread_lock.gif"; // your button source here
		button.appendChild(image);
		mytd.appendChild(button);
		
	}
}