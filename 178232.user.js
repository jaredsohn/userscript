// ==UserScript==
// @name        eMarsys INT
// @namespace   emarsys
// @include     https://us.emarsys.net/p/*
// @version     0.0.5
// @updateUrl   https://userscripts.org/scripts/source/178232.meta.js
// @downloadUrl https://userscripts.org/scripts/source/178232.user.js
// ==/UserScript==

window.addEventListener ("load", LocalMain, false);

function LocalMain ()
{
    document.evaluate("//input[@value='Login' and @type='submit']", document, null, 9, null).singleNodeValue.click();
}