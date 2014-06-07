// ==UserScript==
// @name          Select Facebook Friends (Select All button)
// @description	  
// @namespace     http://www.datamosh.net/
// @include       http://www.facebook.com/*

// Developed by Pablo Damian Cotoia
// ==/UserScript==

(function() {
	inter = 0;
	function startit() {
		if (inter != 0) return;
		buts = document.getElementById('fb_multi_friend_selector_wrapper');
		if (buts) {
			Others = '<div style="position:absolute; top: 48px; right: 32px;" onclick="start=0;howmany=document.getElementById(\'all_friends\').childNodes.length - start;j=0;cont=document.getElementById(\'all_friends\').childNodes; for ( i=start; i<cont.length; i++) {temp = cont[i].childNodes; temp1 = temp[0]; temp1.onclick();j++; if (j>=howmany) break;}; return false;">Select all</div>'
			Link = '';
			parent = document.getElementById('fb_multi_friend_selector_wrapper');
			buts = document.createElement('div');
			buts.innerHTML = Others + Link;
			parent.appendChild(buts);
			inter = 1;
		}
		setTimeout(startit, 2000);
	}
	setTimeout(startit, 100);
})();