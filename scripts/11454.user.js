// ==UserScript==
// @name           Orkut Message Deleter
// @namespace      http://www.devilsworkshop.org/orkut-message-cleaner-script/
// @description    Cleans All Messages too fast
// @include        http://www.orkut.*/*Messages*
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