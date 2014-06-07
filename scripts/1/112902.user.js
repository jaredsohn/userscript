// ==UserScript==
// @name          FXChrome firox button icons
// @namespace     http://userstyles.org
// @description	  FXChrome firox button icon
// @author        htsbai
// @homepage      http://userstyles.org/styles/51118
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#main-window #appmenu-button,\n#appmenu-toolbar-button {\n  background: url(\"chrome://browser/skin/tabbrowser/profile_avatar_note.png\")  !important;\n  background-repeat: no-repeat !important;\n  background-position: center bottom !important;\n}\n\n#main-window[tabsintitlebar] #appmenu-button {\n  background-position: center center !important;\n}\n\n#main-window[privatebrowsingmode=temporary] #appmenu-button,\n#main-window[tabsintitlebar][privatebrowsingmode=temporary] #appmenu-button,\n#main-window[privatebrowsingmode=temporary] #appmenu-toolbar-button {\n  background: url(\"chrome://browser/skin/Privacy-48.png\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center bottom !important;\n}\n\n#main-window[tabsintitlebar][privatebrowsingmode=temporary] #appmenu-button {\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n}";
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