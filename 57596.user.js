// ==UserScript==
// @name           Feedly: hide adverts
// @include        http://www.feedly.com/home
// ==/UserScript==
function addCss(cssCode) {
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
	styleElement.styleSheet.cssText = cssCode;
    } else {
	styleElement.appendChild(document.createTextNode(cssCode));
    }
    document.getElementsByTagName("head")[0].appendChild(styleElement);
}
addCss('#products { display: none; }')
