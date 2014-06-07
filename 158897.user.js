// ==UserScript==
// @name          GL old banner return!
// @description   returns old GL banner to related sites
// @include https://mail.google.com/* https://drive.google.com/*
// ==/UserScript==

;(function() {
	if(document.getElementById('gbi4t').textContent.indexOf('@globallogic.com') > -1){
		var elems = document.getElementsByTagName('img'), i;
		for (i in elems) {
			if(('' + elems[i].className).indexOf('gbqld') > -1) {
				elems[i].src = 'http://upload.wikimedia.org/wikipedia/commons/d/dc/GlobalLogic.png';
			}
		}
	}
})();