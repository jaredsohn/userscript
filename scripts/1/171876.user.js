// ==UserScript==
// @name       Enhanced Arcor Netpass
// @namespace  http://userscripts.org/users/bogl
// @version    0.1
// @description  Enhanced Arcor Netpass
// @match      https://www.arcor.de/netpass/*
// @copyright  2012+, Boris Glusmann
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

addCss('.teasBox { display: none !important;} iframe {display: none !important;}');
addCss('.grid_2col .contentArea {width:660px;} .grid_2col .teaserArea {float:left;}');
//addCss('');

addCss('.table2b .bgGrey2:last-child {background-color:#3b5999;opacity:.85;border:2px solid #cc0000;height:30px;width:470px;position:fixed;text-align:left;bottom:5;left:50;clear:both;color:#000000;color:#ffffff;display:block;float:none;overflow:hidden;z-index:9999;}');

//alert('HaLLo');

