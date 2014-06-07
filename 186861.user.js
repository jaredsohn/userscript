// ==UserScript==
// @name          随机体验贴吧装修
// @namespace	  http://cyanidea.com/
// @author	  Cyan <123456789小子>
// @version	  1.0
// @description	  哈哈哈我写着玩的
// @homepage	  http://userscripts.org/scripts/show/186861
// @updateURL	  https://userscripts.org/scripts/source/186861.meta.js
// @downloadURL	  https://userscripts.org/scripts/source/186861.user.js
// @include       http://tieba.baidu.com/*
// @grant         GM_addStyle
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
if (false || (document.location.href.indexOf("http://tieba.baidu.com/f") == 0)){
	css += ".card_top{background-image: url(/tb/static-frs/img/head_skin/";
	var rand = 1060001 + (Math.round((Math.random()*100))%8);
	css += rand.toString();
	css += ".gif) !important;}";
}
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
