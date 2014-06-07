// ==UserScript==
// @name           OptionsXpress direct links
// @namespace      tag:marckoby,2009-04-01:optionsxpress
// @description    Removes the JavaScript wrapper from links. Eases opening up multiple tabs simultaneously while trading and tracking positions.
// @include        https://*.optionsxpress.com/*
// ==/UserScript==

// Marcos Kobylecki <userscripts.org@askmarcos.com>
//
// This script also reformats date links to be YYYY-MM-DD so that you can use the renaming mask *text*.*ext* in
// Download them All, and get filenames that lend themselves to easy sorting.

// Same idea as:
// http://userscripts.org/scripts/review/39923
// Citibank: javascript:dateClicked('GetPDFStatement.do?stmtDateClicked=03/11/2009_0&dropDownSelected=0')
// OptionsXpress: javascript:AppendSessionID('/quote_detail.asp?SYMBOL=.YWUAG&ACCOUNT_ID=267454&bSwitchSession=1');

var allLinks, thisLink;
allLinks = document.evaluate(
//    "//a[@class='appLsLink']",
    "//a[@class='info']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
// td alignRight
// <td class="nwrap">
// <tr class="datarow_sm" 
// div class="twocol"


for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	 thisLink.href = thisLink.href.replace(/javascript:AppendSessionID\('(.*)'\)/, "$1");
//	 thisLink.innerHTML = thisLink.innerHTML.replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
}

