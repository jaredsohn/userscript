// ==UserScript==
// @name           Hide Google Instant Preview
// @version        0.2
// @author         Aont
// @namespace      http://d.hatena.ne.jp/aont
// @description    Hide Google Instant Preview
// @include        http://*.google.*/search?*
// @include        https://*.google.*/search?*
// ==/UserScript==

(function(){
    function addStyleRule(selector, declaration) {
	var sheet = document.styleSheets[document.styleSheets.length - 1];
	sheet.insertRule(selector + '{' + declaration + '}', sheet.cssRules.length);
    }

    var vspb = document.getElementById("vspb");
    vspb.parentNode.removeChild(vspb);
    
    var rhs = document.getElementById("rhs");
    rhs.parentNode.removeChild(rhs);

    addStyleRule(".s", "max-width: 100%;");
    addStyleRule("#center_col", "margin-right: 0;");
    addStyleRule(".vspib", "display: none;");
})();
