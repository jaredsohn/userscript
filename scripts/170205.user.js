// ==UserScript==
// @name        Larger Reddit Submission Text Box
// @namespace   w3schools
// @description Set .usertext-edit to 450x400px
// @include     http://www.reddit.com/submit*
// @include     http://www.reddit.com/r/*/submit*
// @version     1
// ==/UserScript==

(function() { 
var css = ".usertext-edit textarea {height:400px;}"
if (typeof GM_addStyle != "undefined" )  
	{
		GM_addStyle(css);
	} 

else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else 
	{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
	}
})();	