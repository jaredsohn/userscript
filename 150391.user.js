// ==UserScript==
	// @name       Tweakers 7 anti-blindheid
	// @version    0.5
	// @description  Stylesheet van http://gathering.tweakers.net/forum/list_messages/1521052 in een userscript.
	// @include      http://tweakers.net/*
	// @include      http://*.tweakers.net/*
	// @copyright  2012+, @vonloghausen, css: Blue-eagle & Ethelind
// ==/UserScript==

(function() {
	var style = document.createElement('style'),
	rules = '.popup.trackerPopup.fixed{margin-top:-20px;margin-left:20px;position:fixed!IMPORTANT;left:30px!IMPORTANT;top:160px!IMPORTANT}html{background:#444}div#contentArea{padding-left:20px;padding-right:20px;background-image:linear-gradient(bottom,#e3e3e3 1%,#ababab 51%,#e0e0e0 100%);background-image:-o-linear-gradient(bottom,#e3e3e3 1%,#ababab 51%,#e0e0e0 100%);background-image:-moz-linear-gradient(bottom,#e3e3e3 1%,#ababab 51%,#e0e0e0 100%);background-image:-webkit-linear-gradient(bottom,#e3e3e3 1%,#ababab 51%,#e0e0e0 100%);background-image:-ms-linear-gradient(bottom,#e3e3e3 1%,#ababab 51%,#e0e0e0 100%);background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0.01,#e3e3e3),color-stop(0.51,#ababab),color-stop(1,#e0e0e0))}#menubar{width:980px}#searchbar{margin:34px auto 0 auto;width:1020px}.galleryHeadingContainer,.pageTabsContainer,.notificationsContainer{margin:0 auto;width:1020px}.pageTabsContainer{border-bottom:1px solid #c3c6c6}#top{border-bottom:0}#bottom div.hr{background:none}';

	if(style.styleSheet) {
		style.styleSheet.cssText = rules;
	} else {
		style.appendChild(document.createTextNode(rules));
	}

	document.getElementsByTagName('head')[0].appendChild(style);

})();