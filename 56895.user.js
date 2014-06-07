// ==UserScript==
// @name          Gmail Inbox With Less Buttons
// @version       0.3
// @description   Declutters the Gmail inbox by removing unnecessary buttons.
// @author 	      mconstantine
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml);"
css +=  "#\\:p4.goog-imageless-button {display: none;}"  // remove the upper Move To button
css +=  "#\\:p3.goog-imageless-button {display: none;}"  // remove the upper Labels button         
css +=  "#\\:p2.goog-imageless-button {display: none;}"  // remove the upper More Actions button
css +=  ".nH .AY {display:none;}"       // remove the lower button bar
css +=  ".A1 .Cq .AP {display: none;}"  // remove the upper refresh button
css +=  ".A1 .Cr .Dj {opacity: 0.2;}"   // fade the upper and lower count (1-10 of 22)
css +=  ".A1 .yV {display: none;}"          // remove the upper select nav
           
          
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