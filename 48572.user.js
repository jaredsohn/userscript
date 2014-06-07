// This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
// More info: http://greasemonkey.mozdev.org/
//
// ==UserScript==
// @name               Remove Invalid Characters
// @author             softforum
// @version            0.2
// @namespace          http://userscripts.org/users/softforum
// @description        Remove Invalid Characters
// @include            http://*.s-dragon.org/*.php*
// ==/UserScript==

(function() {
	var css = "div[class=\"postmessage defaultpost\"] {overflow: visible ! important;}";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}

	var link
	document.title = cleanText(document.title);
	document.getElementById("nav").innerHTML = cleanText(document.getElementById("nav").innerHTML);

	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		link = links[i];
		link.textContent = cleanText(link.textContent);
	}

	var links = document.getElementsByTagName('h1');
	for (var i = 0; i < links.length; i++) {
		link = links[i];
		link.textContent = cleanText(link.textContent);
	}
	
	function cleanText(text)
	{
		var text2 = '';
		for (var j = 0; j < text.length; j++) {
			if (text.charCodeAt(j) != 65533)
				text2 += text.charAt(j);
			else
				break;
		}
		return text2;
	}
})();