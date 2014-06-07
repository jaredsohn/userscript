// ==UserScript==
// @name           imageshack show direct link
// @namespace      http://googleISbad.com
// @description    Allows normal usage of direct image link when uploading images on imageshack.us.
// @include        http://*.imageshack.us/content_round.php?page=done*
// @include        http://imageshack.us/content_round.php?page=done*
// @include        https://*.imageshack.us/content_round.php?page=done*
// @include        https://imageshack.us/content_round.php?page=done*
// ==/UserScript==

function xpath(doc, xpath) {
	return doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

var nodes = xpath(document,"//div[@id='ImageCodes']/div[@class='links']/div[@class='listbox']/a[@class='tt']/input[@class='readonly']");

var nodes2 = xpath(document,"//div[@id='ImageCodes']/div[@class='links']/div[@class='listbox']/input[@class='readonly']");

var nodeAttributes = ['onclick', 'disabled', 'onmousedown', 'onselectstart', 'ondoubleclick', 'wrap'];

for (x=0;x<nodes.snapshotLength;x++) {
	for (y=0;y<nodeAttributes.length;y++) {
		nodes.snapshotItem(x).removeAttribute(nodeAttributes[y]);
		nodes.snapshotItem(x).parentNode.removeAttribute('href');
	}
}

for (x=0;x<nodes2.snapshotLength;x++) {
	for (y=0;y<nodeAttributes.length;y++) {
		nodes2.snapshotItem(x).removeAttribute(nodeAttributes[y]);
	}
}


GM_addStyle('div.listbox > label + a.tt > input + *, img[src^="/images/blue/help.gif"], div#signup, div#signin {display:none!important;visibility:hidden!important;} #ImageCodes > div:first-child > div:last-child > a > input {z-index:65000!important;}');


