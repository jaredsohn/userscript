// ==UserScript==
// @name          Rooster Teeth - RTSE Theme
// @namespace     http://xboxnation.net
// @description	  A new RTSE theme for RT! Possible addition to RTSE.
// @author        GoCrzy
// @include       http://www.roosterteeth.com/*

// ==/UserScript==
(function() {
var css = ".sargeSide { background:url('http://images.roosterteeth.com/assets/style/images/rvb/sideLeft.png') top center no-repeat; vertical-align:top; } #header { background:url('http://physicsforumgame.us.to/images/rtseheader.png') top left no-repeat; behavior:url(/iepngfix.htc); width:100%; height:90px; } #tabsHolder {background:#000000 url('http://physicsforumgame.us.to/images/rtseheader.png') bottom left repeat; height:24px; vertical-align:bottom; text-align:left; padding-left:0; width:100%; }";
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
