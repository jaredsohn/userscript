// ==UserScript==
// @name           eBay timezone fix
// @namespace      http://bzr.sesse.net/greasemonkey-scripts/
// @description    Changes all eBay times to be in your local time zone
// @include        http://ebay.com/*
// @include        http://*.ebay.com/*
// @include        https://ebay.com/*
// @include        https://*.ebay.com/*
// ==/UserScript==

function nf(x)
{
	if (x < 10) {
		return "0" + x;
	} else {
		return x;
	}
}

function getTextNodes(oNode, aText)
{
	for (var i = 0; i < oNode.childNodes.length; i++) {
		var oChild = oNode.childNodes.item(i);
		switch(oChild.nodeType) {
		case 1:
			getTextNodes(oChild, aText);
			break;
		case 3:
			aText.push(oChild);
			break;
		}
	}
}

var text = [];
getTextNodes(document, text);
for (var i = 0; i < text.length; i++) {
	var elem = text[i];
	var str = elem.nodeValue;

	var foo = str.match(/(\S\S\S)-(\d\d)-(\d\d)(\s+|\s+at\s+)(\d\d:\d\d:\d\d)\s+PST/);
	if (foo != null) {
		var d = new Date(foo[1] + ' ' + foo[2] + ' 20' + foo[3] + ' ' + foo[5] + " PST");
		var tzinfo = d.toString().match(/\((\S+)\)/);
		var dstr = d.getFullYear() + '-' + nf(d.getMonth() + 1) + '-' + nf(d.getDate()) + ' ' + nf(d.getHours()) + ':' + nf(d.getMinutes()) + ':' + nf(d.getSeconds()) + " " + tzinfo[1];
		elem.nodeValue = str.replace(foo[0], dstr);
	}
}

