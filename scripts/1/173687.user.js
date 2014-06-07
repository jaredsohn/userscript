// ==UserScript==
// @name          FBHigherChatWindow
// @namespace     https://www.facebook.com/morph4u
// @description	  Changes hight of facebook chat window
// @author        morph4u
// @homepage      https://www.facebook.com/morph4u
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @version       1.1
// @run-at        document-start
// ==/UserScript==
(function () 
{
    var css = ".fbNubFlyout.fbDockChatTabFlyout{\n height: 400px !important; \n  \n  box-sizing:border-box !important; \n}\n\ndiv.clearfix.fbNubFlyoutTitlebar.titlebar{\n  resize:vertical !important;\nposition: relative !important;\n} \n\ndiv.fbNubFlyoutHeader {display:none}";
    if (typeof GM_addStyle != "undefined") 
{
	GM_addStyle(css);
}
else if (typeof PRO_addStyle != "undefined") 
{
	PRO_addStyle(css);
}
else if (typeof addStyle != "undefined") 
{
	addStyle(css);
}
else 
{
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) 
    {
		heads[0].appendChild(node);
    }
    else 
    {
		document.documentElement.appendChild(node);
	}
}
})();
