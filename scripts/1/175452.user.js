// ==UserScript==
// @name        AdPrize Skipper
// @namespace   http://neobux.com
// @description Skip automatically the Adprize Ads (Neobux)
// @include      http://*.neobux.com/*
// @version     1.1
// @grant 		none
// ==/UserScript==     
     
unsafeWindow.areYouReallySure=true;
var lien;
function checkpub() {
	if(document.getElementById('nxt_bt_a').getElementsByTagName('span')[0] = false) return;
	else if(First) {
	lien = document.getElementById('nxt_bt_a').href;
	if (lien != 'javascript:;') {
	First = false;
	document.location.href=lien;
	}
	}
	 
}

  


var First = true;
setInterval(checkpub,2000);