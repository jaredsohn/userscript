// ==UserScript==
// @name        WanaDev defi 7
// @namespace   Clowst
// @description forfun @ step7 wanadev defi
// @include     http://defi.wanadev.fr/ax7.php
// @version     1b (Version Parse)
// @grant 		GM_xmlhttpRequest
// ==/UserScript==

	// Récupération du JSON & parse
	var rcpJSON = JSON.parse(document.body.innerHTML);

	var resultat= parseInt(rcpJSON.first_number) * parseInt(rcpJSON.second_number) + parseInt(rcpJSON.third_number);
	
	// On renvoi la requete avec notre résultat
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://defi.wanadev.fr/ax7.php?result="+resultat,
		onload: function(response) {
			alert('reponse finale: ' + response.responseText);}
	});
