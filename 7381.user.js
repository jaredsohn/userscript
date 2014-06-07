// ==UserScript==
// @name           	Auto Confirm Friend Request 
// @namespace     	http://www.devilsworkshop.org
// @description 	Auto Confirm Friend Request on Orkut
// @include        	http://*.orkut.*/FriendAdd.aspx*
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		window.location.href = "javascript: _submitForm(document.evaluate('/html/body/div[6]/div[4]/table/tbody/tr[2]/td[1]/form/div[7]/span[1]/a', document, null, 7 , null).snapshotItem(0),'yes');"
	
	},
	true);
