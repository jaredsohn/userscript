// ==UserScript==
// @name           Filmtipset.se remove Nyheter24 bar and logo
// @namespace      http://userscripts.org/users/121410
// @include        http://nyheter24.se/filmtipset/*
// ==/UserScript==

/** With jumping layout but collapse
function hideDivByXpath(attribute, string)
{
    var xpath = '//div[contains(@' + attribute + ',"' + string + '")]/.';
    document.evaluate(
            xpath,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        ).snapshotItem(0).style.display = "none";
} */

function hideDivByXpath(attribute, string)
{
    var xpath = '//div[contains(@' + attribute + ',"' + string + '")]/.';
    var div = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        ).snapshotItem(0);
    div.innerHTML = '';
    div.style.background = 'transparent';
}
hideDivByXpath('class','headCoreNetworkNavigation');
hideDivByXpath('style','Nyheter24logga.png');