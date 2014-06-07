// ==UserScript==
// @name           	Auto Approve Pending Friend Requests
// @namespace     	http://www.devilsworkshop.org/Orkut
// @description 	Auto Approve Penidng Friend Request on Orkut...
// @include        	http://*.orkut.*/Home*
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		window.location.href = "javascript: _submitForm(document.evaluate('/html/body/div[7]/div[5]/table[3]/tbody/tr[2]/td/div/form/div/div[7]/span/span/a', document, null, 7 , null).snapshotItem(0),'acceptFriend');"	
	},
	true);
