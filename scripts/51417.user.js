// ==UserScript==
// @name           Travian title fixer
// @version        1.02
// @date           2008-02-17
// @namespace      gp
// @description    Fixes page title for easier browsing with tabs and the back button dropdown menu.
// @include        http://s*.travian.*/*
// ==/UserScript==

function fix_title()
{
    var xp = xpath('//h1');
    if (xp.snapshotLength == 0) return;
    var title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');
    if (window.location.pathname.indexOf('/dorf2.php') == 0)
        title = String.fromCharCode(164, 32) + title;
    document.title += ' - ' + title;
}

function xpath(xp)
{
    return document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

window.addEventListener('load', fix_title, true);