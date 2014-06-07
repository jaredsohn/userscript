// ==UserScript==
// @name           OzBargain Suppress Expired
// @version        0.2
// @author         Luke Mason
// @namespace      ozbargain
// @description    Suppresses Expired Deals by setting expired nodes to display:none
// @include        http://www.ozbargain.com.au/*
// ==/UserScript==

GM_log('Start of Script')
GM_log('Adding style to stylesheet');
GM_addStyle('.redborder {border-style:solid;border-width:3px;border-color:red;}');
GM_addStyle('.suppress{display:none;');

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='node node-ozbdeal expired']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	GM_log('Suppressing Node: ' + i);
	thisDiv.className += " suppress"
}
GM_log('End of Script')
