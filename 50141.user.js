// ==UserScript==
// @name			FixYa Un-Notifier
// @author        	usersXcript
// @version             v1.00
// @description		Disables auto "Notify me when this question changes"
// @include			http://www.fixya.com/support/*
// @include			http://fixya.com/support/
// ==/UserScript==

function main(){
		var not    = document.evaluate('//input[@id="btnNorify"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var notif  = not.snapshotItem(0);
		
		if(notif.checked){
			notif.removeAttribute('checked');
		}

}
main();