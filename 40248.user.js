// ==UserScript==
// @name          Usable Gmail ! Ads & Footer
// @namespace     http://userstyles.org
// @description	  Usable Gmail ! Ads & Footer
// @author        HannibalSmith
// @homepage      http://userscripts.org/users/35001
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); * {font-family: sans-serif !important; color: #369 !important; font-size: 1.001em !important;} #nvi {display: none !important;} .yxEQwb { visibility: hidden !important;} .s7hnoe, .LaiJff, .Ax9Ooe, .tBLpAf, .pghVUe, .haNaWc, .IUntof, .mn, .l6, .mp, .ma,.nH.u5 { display: none !important;} [maxlength='2048'] { background: #f3f3f3 !important; padding-left: .1em !important; width: 325px !important;} div[class^=yxEQwb] {display: none !important;} /* div[class='XoqCub a3hTGd'] {display: none !important;} */ div[class='XoqCub I94Sdc'], .nH.pY {display: none !important;} .lMVONe, .BylWac {margin-bottom: -6px !important;} .HhG5wd {margin-top: 1px !important;} .mj {position: absolute !important; right: 10px !important; top: 84px !important; color: #336699 !important; font-size: .8em !important; }";
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
