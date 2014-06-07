// Copyright (c) 2011 Luca Falavigna
// This script is licensed under the MIT license.
//
// ==UserScript==
// @name          Businessway
// @namespace     https://secure1.businesswaybnl.it/newcorporate/webcontoc/login/login
// @description	  Check for more signatures on BusinessWay Home Banking
// @include       *
// ==/UserScript==

(function() {
	var arr = new Array();
	var body = document.body.innerHTML;
	var pattern = 'Alla Firma';
	if (body.search(pattern) != -1) {
		if (document.getElementById('firmaspedisci'))
			document.getElementById('firmaspedisci').style.visibility = 'hidden';
		if (document.getElementById('spedisci'))
			document.getElementById('spedisci').style.visibility = 'hidden';
		arr = document.getElementsByName('signSend');
		for(var i = 0; i < arr.length; i++)
			document.getElementsByName('signSend').item(i).style.visibility = 'hidden';
		arr = document.getElementsByName('send');
		for(var i = 0; i < arr.length; i++)
			document.getElementsByName('send').item(i).style.visibility = 'hidden';
}
})();