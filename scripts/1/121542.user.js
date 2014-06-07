// ==UserScript==
// @name          Gmail - Extra-Wide Widescreen view          
// @description   Hides the right hand sidebar in the message view in Gmail
// @author        Arvind Satyanarayan
// @version       1.0
// @license       GPLv3
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

(function(){
    
    var css = ".Bs .Bu:nth-child(2) {display:none!important}";

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

})(); //end anonymous function