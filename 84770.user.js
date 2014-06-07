// ==UserScript==
// @name          Neobux - Notification Enhancer
// @namespace     http://userstyles.org
// @description	  This style enhances the notification effect on Neobux.com. Instead of the normal plain green/blue background of the notification, the colours will flash accordingly, which will make it more noticable.
// @author        gofish
// @homepage      http://userscripts.org
// @include       http://www.neobux*
// @include       https://www.neobux*
// ==/UserScript==
(function() {
var css = "div[class=\"t_verde\"] {\nfont-size: 100px !important;\ntext-shadow: 5px 5px 5px black !important;\nbackground: url(\"http://i35.tinypic.com/6hrm01.gif\") !important;\n}\n\ndiv[class=\"t_azul\"] {\nfont-size: 50px !important;\ntext-shadow: 5px 5px 5px black !important;\nbackground: url(\"http://i33.tinypic.com/2lk73tf.gif\") !important;\n}";
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
