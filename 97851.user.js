// ==UserScript==
// @name          Facebook theme light
// @namespace     http://userstyles.org
// @description	  Zmena CSS designu dómeny Facebook.com
// @author        Tincex
// @homepage      http://userstyles.org/styles/43691
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
(function() {
var css = "body {\nbackground: url(\"http://www.maniactive.com/Valentine/all-is-fair.jpg\") repeat !important;\n}\n\n.uiSideNav .item, .uiSideNav .subitem {\ncolor: maroon !important;\nline-height: 15px !important;\nborder-bottom: 1px solid blue !important;\nfont-weight: bold !important;\n}\n\n#contentCol {\nbackground-color: #CCFFFF !important;\n}\n\n.uiHeader h2 {\ncolor: maroon !important;\nfont-size: 20px !important;\n}\n\n.uiSideNav .selectedItem .item, .uiSideNav .selectedItem .item:hover, .uiSideNav ul .selectedItem .subitem, .uiSideNav ul .selectedItem .subitem:hover {\nbackground-color: lightgreen !important;\nfont-weight: bold;\n}\n\n.uiMentionsInput .mentionsTextarea, .uiMentionsInput .mentionsTypeahead {\nbackground: #FFEECC !important;\n}\n\n#navAccountInfo {\nborder-bottom: 2px solid brown !important;\n}\n\n#navAccount ul {\nbackground: lightgreen !important;\n}\n\n#pageLogo a {\nbackground-color: darkblue !important;\n}\n\n#blueBar {\nbackground-color: #CCAAFF !important;\n}\n\n#headNav {\nbackground-color: #FF7766 !important;\nborder: 1px solid blue !important;\n}\n\n.fbChatBuddylist .fbChatBuddylistError, .fbChatBuddylist .info_text {\nbackground-color: yellow !important;\n}\n\n.fbNubFlyoutTitlebar {\nbackground-color: darkblue !important;\nborder: 1px solid yellow !important;\n}\n\n.fbNubFlyout {\nbackground-color: #99EEEE !important;\n}\n\nelement.style {\nbackground-color: yellow !important;\n}\n\n.fbNubButton:hover {\nbackground: lightgreen !important;\n}\n\n.fbDock, .fbDockWrapperLeft .lNubContainer, .fbDockWrapperRight .rNubContainer {\nbackground: #CCAAFF !important;\n}";
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
