// ==UserScript==
// @name	  Yet Another Gmail Ad Remover
// @version	  1.5
// @description	 Removes ad, chat, invite from Gmail.
// @author	  skynetbug (skynetbug@live.com)
// @include	  http://mail.google.com/*
// @include	  https://mail.google.com/*
// @include	  http://*.mail.google.com/*
// @include	  https://*.mail.google.com/*
// ==/UserScript==

(function () {
    var css = "@namespace url(http://www.w3.org/1999/xhtml);" +
        "div[class=\"aeO\"] { display: none; }"+
        "div[class=\"akc lKgBkb\"] { display: none; }"+
        "table[class=\"Bs nH ao9 dGpsQd id\"] > tr > td:nth-child(2) { display: none; } "+
        "table[class=\"Bs nH ao9 id dGpsQd\"] > tr > td:nth-child(2) { display: none; } "+
        "table[class=\"Bs nH iY\"] > tr > td:nth-child(3) { display: none; } "+
        "div[class=\"nH hx\"] > div:nth-child(4) { display: none; }";

    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    }
    else if (typeof addStyle != "undefined") {
        addStyle(css);
    }
    else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");

            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
})();

