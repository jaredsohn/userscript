// ==UserScript==
// @name           Why Flag If Not To Trash?
// @namespace      localhost
// @description    Removes scripts you flag as spam/malware from your list on userscripts.org.
// @include        http://userscripts.org/scripts
// @include        http://userscripts.org/scripts?page=*
// @include        http://userscripts.org/flag/Script/*
// ==/UserScript==
/*
The idea - when a user flags a script as spam/malware, remove it too.
*/
// the easy bit
var links = document.evaluate("//tr/td[@class='script-meat']/a[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var flagArray = GM_getValue('flagArray', null);
if (flagArray !== null) {
	var flagged = flagArray.split(":");
	if (!flagged.length) { return; }
	for (i=0; i<links.snapshotLength; i++) {
		link = links.snapshotItem(i);
		if (link.href.match(/\/show\//)) {
			script_no = link.href.match(/\/(\d+)/)[1];
			for (j=0; j<flagged.length; j++) {
				if (script_no == flagged[j]) {
					reject = link.parentNode.parentNode;
					reject.parentNode.removeChild(reject);
					GM_log("Rejected script #" + script_no);
					break;
				}
			}
		}
	}
}

var script_no = window.location.href.match(/(\d+)/)[1];
// add event listener to Flag It button
var flagIt = document.getElementsByName('commit')[0];
if (flagIt) {
	flagIt.addEventListener('click', trash, false);
}

function trash() {
		flagArray = GM_getValue('flagArray', null);
		GM_setValue('flagArray', flagArray + script_no + ":");
}
