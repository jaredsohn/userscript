
//Title:	SpamLinkDetector
//Version: 	0.1
//Date:	07-February-2009
//pdated:	15-February-2009
//Author:	Diado
//URL:	http://diado.deviantart.com/
//Disclaimer:	This script is provided 'as is', without any warranty or guarantee of any kind.
//
// ==UserScript==
// @name          SpamLinkDetector v0.1
// @namespace     SpamLinkDetector
// @description   Detects and removes spam links on deviantART
// @include       http://*.deviantart.com/*
// @exclude 	http://chat.deviantart.com/*
// @exclude 	http://www.deviantart.com/submit*
// ==/UserScript==

var anchors, anchor, i, j, href, replacement, definitions;

definitions = new Array();

definitions[0] = 'loginspage.com';
definitions[1] = 'yourlovecalc.com';
definitions[2] = 'rosemaryxicapiw.blogspot.com';
definitions[3] = 'goldierowule.blogspot.com';
definitions[4] = 'fannygosupa.blogspot.com';
definitions[5] = 'chatwebcamfree.com';
definitions[6] = 'hiwebcams.com';

anchors = document.evaluate("//a[@href]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (anchors.snapshotLength > 0) {
	for (i = 0; i < anchors.snapshotLength; i++) {
		anchor = anchors.snapshotItem(i);
		href = anchor.getAttribute('href')
		for (j=0; j < definitions.length; j++) {
			if (href.search(definitions[j]) > -1) {
				replacement = document.createTextNode('[spam link detected and removed by SpamLinkDetector]');
				anchor.parentNode.insertBefore(replacement, anchor);
				anchor.parentNode.removeChild(anchor);
				GM_log('SpamLinkDetector detected and removed a spam link');
			}
		}
	}
}

