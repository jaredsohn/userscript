// ==UserScript==
// @name           Vkontakte_Unread_Message_Highlights
// @namespace      http:// vkontakte . ru
// @include        http://vkontakte.ru/mail.php*
// @include        http://vkontakte.ru/im.php*
// ==/UserScript==

var css_1=".mailbox table tr.newRow {background-color: #FECFCF }";
if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css_1);
} else if (typeof addStyle != "undefined") {
    addStyle(css_1);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css_1));
        heads[0].appendChild(node);
    }
}


var css_2=".im_hist tr.un {background-color: #FECFCF }";
if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css_2);
} else if (typeof addStyle != "undefined") {
    addStyle(css_2);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css_2));
        heads[0].appendChild(node);
    }
}





