// ==UserScript==
// @name        Yolcar Prueba
// @namespace   http://neobux.com
// @description Skip automatically (Neobux)
// @include      http://*.neobux.com/*
// @version     1
// @grant 		none
// ==/UserScript==     
     
unsafeWindow.areYouReallySure=true;
var lien;
function checkpub() {
	if(document.getElementsByClassName('button small2 orange').getElementsByTagName('span')[0] = false) return;
	else if(First) {
	lien = document.getElementsByClassName('button small2 orange').onclick;
	if (lien != 'javascript:;') {
	First = false;
	document.location.onclick=lien;
	}
	}
	 
}

  


var First = true;
setInterval(checkpub,2000);