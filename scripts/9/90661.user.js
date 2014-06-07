// ==UserScript==
// @author			AngeloMandato
// @name           Remove Zoho Projects Gadget from Gmail
// @namespace      http://google.com/removezohoprojectsgadget
// @description    Removes Zoho Projects Gadget/widget from footer of email messages in Gmail.
// @include        https://mail.google.*
// @include        http://mail.google.*
// ==/UserScript==

(function(){
var css="\
	div.gs div.hi					/*Zoho Projects Gadget */\
	{\
		display: none !important;\
	}\
";

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
})();
