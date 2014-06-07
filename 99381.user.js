// ==UserScript==
// @name          Facenote Grayscale
// @namespace     Facenote Basic
// @description	  Grayscale of Facebook Theme
// @author        Rui Fujiwara
// @homepage      http://ruifujiwara.co.cc
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
(function() {
var css = "body {\nbackground: url(\"http://img263.imageshack.us/img263/7397/allisfair.jpg \") repeat !important;\n}\n\n.uiSideNav .item, .uiSideNav .subitem {\ncolor: maroon !important;\nline-height: 15px !important;\nborder-bottom: 1px solid black !important;\nfont-weight: bold !important;\n}\n\n#contentCol {\nbackground-color: # #999999 !important;\n}\n\n.uiHeader h2 {\ncolor: maroon !important;\nfont-size: 20px !important;\n}\n\n.uiSideNav .selectedItem .item, .uiSideNav .selectedItem .item:hover, .uiSideNav ul .selectedItem .subitem, .uiSideNav ul .selectedItem .subitem:hover {\nbackground-color: lightgreen !important;\nfont-weight: bold;\n}\n\n.uiMentionsInput .mentionsTextarea, .uiMentionsInput .mentionsTypeahead {\nbackground: #666666 !important;\n}\n\n#navAccountInfo {\nborder-bottom: 2px solid brown !important;\n}\n\n#navAccount ul {\nbackground: black !important;\n}\n\n#pageLogo a {\nbackground-color: white !important;\n}\n\n#blueBar {\nbackground-color: #000000 !important;\n}\n\n#headNav {\nbackground-color: #000000 !important;\nborder: 1px solid black!important;\n}\n\n.fbChatBuddylist .fbChatBuddylistError, .fbChatBuddylist .info_text {\nbackground-color: yellow !important;\n}\n\n.fbNubFlyoutTitlebar {\nbackground-color: white !important;\nborder: 1px solid yellow !important;\n}\n\n.fbNubFlyout {\nbackground-color: #CCCCCC !important;\n}\n\nelement.style {\nbackground-color: black !important;\n}\n\n.fbNubButton:hover {\nbackground: white !important;\n}\n\n.fbDock, .fbDockWrapperLeft .lNubContainer, .fbDockWrapperRight .rNubContainer {\nbackground: #333333 !important;\n}";
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
javascript:var o=document.getElementById('pageLogo').getElementsByTagName('a')[0];void(o.style.backgroundImage='url("http://img806.imageshack.us/img806/7940/facenote.png")');void(o.style.backgroundPosition='0 0')
})();
