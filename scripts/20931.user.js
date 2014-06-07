// ==UserScript==
// @name           Orkut Message Deleter
// @namespace      nobody
// @description    Cleans All Messages too fast
// @include        http://www.orkut.com/Messages.aspx*
// ==/UserScript==

window.addEventListener(
     'load',
     function() {

	var testmsg = document.evaluate('/html/body/div[4]/div[3]/form[2]/table/tbody/tr[2]/td[1]/div/input', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//	GM_log(testmsg.snapshotLength);

	if( testmsg.snapshotLength)
		window.location.href = "javascript: _checkAll(document.forms['f'],'msgKeys', true); doMsgsAction('msgsDelete'); ";
     },
     true);
