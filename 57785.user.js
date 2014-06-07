// ==UserScript==
// @name           Helvetimail
// @namespace      http://josefrichter.com
// @description    A skin for Gmail by www.josefrichter.com
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// ==/UserScript==



var hal = function (){
	var css = '@import "http://www.josefrichter.com/helvetimail.css";';
	
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			//node.type = "text/css";
			node.innerHTML = css;
			heads[0].appendChild(node); 
		}
	}
}

window.setTimeout(hal, 4000);
