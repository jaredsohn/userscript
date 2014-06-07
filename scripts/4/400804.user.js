// ==UserScript==
// @name          Tumblr - Notification colour
// @namespace     http://userstyles.org
// @description	  Change notificaton colour on your dash (asks, new posts) back to red
// @author        monilip
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function () {
    var css = '#header #inbox_button .tab_notice, #header #home_button .tab_notice {background-color: #D93023 !important;}';
    if (typeof GM_addStyle != 'undefined') {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != 'undefined') {
        PRO_addStyle(css);
    } else if (typeof addStyle != 'undefined') {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName('head');
        if (heads.length > 0) {
            var node = document.createElement('style');
            node.type = 'text/css';
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
}) ();
