// ==UserScript==
// @name         FB messaging tweak
// @namespace    FB messaging tweak
// @author       ariand
// @description  decluttering the ui
// @run-at       document-end
// @include      https://www.facebook.com/*
// ==/UserScript== 

(function() {
var css = " .bubbles ._kso {\n     background-color: #DBEDFE!important;\n     background-image: none !important;\n     border-width: 0 !important;\n }\n \n .bubbles ._50kd ._kso {\n     background-color: #FFFFFF !important;\n }\n \n \n ._50mz .conversationContainer .conversation {\n    background: #f6f6f6 !important;\n }\n \n .bubbles div._511n {\n     background: #f6f6f6 !important;\n }\n \n .bubbles ._kso:after, .bubbles ._kso:before {\n     display: none !important;\n }\n \n .bubbles .fbDockChatTabFlyout .fbNubFlyoutBody {\n     background-color: #F6F6F6 !important;\n }";
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
        document.documentElement.appendChild(node);
    }
}
})();