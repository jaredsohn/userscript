// ==UserScript==
// @name     Reseau Contact Automatic Expander
// @version  1.01
// @author   Mikha (with the Help of Brock Adams)
// @include  http://reseaucontact.com/profil/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

//-- Delay the link clicks 333 mS and 777 mS, respectively.
setTimeout (clickLinkWithText, 333, "Voir tous les détails");
setTimeout (clickLinkWithText, 777, "Lire la suite");

function clickLinkWithText (linkText) {
    var targetLink = $("a:contains('" + linkText + "')");
    if (targetLink.length) {
        triggerMouseEvent (targetLink[0], "click");
    }
}

function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}


