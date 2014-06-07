// ==UserScript==
// @author         leonardo molina
// @version        0.2
// @name           +1 on every site
// @namespace      com.arseitmx.greasemonkey_plusone
// @description    Place a small Google +1 button on the lower left corner of any website
// @include        http://*
// @include        https://*
// @exclude        https://*.google.com
// @exclude        http://*.google.com
// ==/UserScript==

// 2001-10-11	0.1 Initial version
// 2001-10-11	0.2 Update to omit script execution within frames

	if (self == top){
		var heads = document.getElementsByTagName("head");
		var head =heads[0];
		var node = document.createElement("script");
		node.type = "text/javascript";
		node.src = "https://apis.google.com/js/plusone.js";
		head.appendChild(node);
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML ='#GMPlusOneButton {position:fixed;bottom:20px;left:5px;z-index:1}';
		head.appendChild(style);

		var body = document.getElementsByTagName("body")[0];
		var node = document.createElement("div");
		node.id = "GMPlusOneButton";
		node.innerHTML = '<g:plusone size="small"></g:plusone>';
		body.appendChild(node);
	}
