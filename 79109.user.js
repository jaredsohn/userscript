// ==UserScript==
// @name		No Bzzzzzzzzzzzzzzzz
// @author		AltF4
// @date		10/06/14
// @version	v1.0
// @namespace 	4chan
// @include	*.4chan.org*
// ==/UserScript==

derpSWF = document.evaluate('//embed[@src="http://swf.4chan.org/derp.swf"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
derpSWF.parentNode.parentNode.removeChild(derpSWF.parentNode);

