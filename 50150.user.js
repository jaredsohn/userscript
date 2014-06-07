// ==UserScript==
// @name           Orkut Mass Message Deleter By Nick'S
// @namespace      Created by Nick'S
// @description    Cleans All Orkut Messages too fast.....
// @include        http://www.orkut.*/Messages.aspx*
// ==/UserScript==

window.addEventListener(
     'load',
     function() {

	var msgnum = document.evaluate('//input[@type=\'checkbox\']', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

/* 	GM_log(msgnum.snapshotLength); */

	if( msgnum.snapshotLength > 0 )
		window.location.href = "javascript: _checkAll(document.forms['f'],'msgKeys', true); doMsgsAction('msgsDelete'); ";
     },
     true);