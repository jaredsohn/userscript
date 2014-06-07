// ==UserScript==
// @name		No remem/b/er
// @author		JaSK
// @date		10/06/18
// @version	v1.0
// @namespace 	4chan
// @include	*.4chan.org*
// ==/UserScript==

derpSWF = document.evaluate('//embed[@src="http://swf.4chan.org/oldb.swf"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
derpSWF.parentNode.parentNode.removeChild(derpSWF.parentNode);