

// ==UserScript==
// @name           BiggerMine v2.0
// @namespace      http://sockclap.selfip.com/ and http://nerd.nu/
// @description    Make the applet res bigger in minecraft
// @include        *play.jsp*
// @include        *survivaltest*
// ==/UserScript==

//READ: To customize resolution, change width and height values.  ALSO CHANGE WIDTH VALUE IN CSS ( { width: 1400px !important; } ) IN ORDER TO HAVE A CENTERED APPLET!


all = document.getElementsByTagName('*');

for (var i = 0; i < all.length; i++) {
    element = all[i];
	if (element.nodeName == 'APPLET') {
		element.setAttribute('width', '1,195');
		element.setAttribute('height', '672');
	}
}

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #content { margin-left: auto; margin-right: auto; width: 1195px; } body, html { background-color: #25272D !important; background-image:url('http://mac-hacker.org/alpha.png') !important; } #content { width: 1195px !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
})();
