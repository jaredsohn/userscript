// ==UserScript==
// @name		No Puddi
// @author	AltF4
// @date		10/06/14
// @version	v1.0
// @namespace 4chan
// @include	*.4chan.org*
// ==/UserScript==

derpSWF = document.evaluate('//embed[@src="http://www.youtube.com/v/B10BxYZqa1Q?fs=1&autoplay=1"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
derpSWF.parentNode.parentNode.removeChild(derpSWF.parentNode);