// ==UserScript==
// @name           Mejor emol (softcore)
// @author         KAWB
// @version        2013-11-02
// @namespace      www.emol.com
// @updateURL      https://userscripts.org/scripts/source/135316.meta.js
// @download       https://userscripts.org/scripts/source/135316.user.js
// @description    Elimina OnClick + mugre general (propaganda, redes sociales, suscripciones, etc)
// @include        http://www.emol.com/*
// @include        http://emol.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


function deleteOnClick() {
	var xpath = function(query) {
		return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};

	for (var items = xpath.call(this, '//a[@onclick]'), i = 0; i < items.snapshotLength; i++) {
		var item = items.snapshotItem(i);
		item.removeAttribute('onclick');
	}
}

for (var i=0; i<5; i++) {
	if (i === 0){
                $("div#economicosSidebar").remove();
		$("div#clubright200px").remove();
		$("div#eltiempo_home").remove();
		$("div#divRestaurantesEmol").remove();
		$("div#caja_mapas").remove();
		$("div#CajaFarox2").remove();
		$("div#divViveDescto").remove();
		$("div#ContenedorMasVistoFarox").remove();
		$("div#divFarox").remove();
		$("div#divredes_sociales").remove();
		$("div#divcaja_juegos").remove();
		$("div#divcaja_movil_otros").remove();
		$("div#Caja06").remove();
		$("div#divcol_clasificados").remove();
		$("div#bottom").remove();
		$("div#div_caja_servicios_1").remove();
		$("div#divClubLectores").remove();
                $("div#divFrmClasificado").remove();
                $("div#divcaja_educacion").remove();
                $("div#caja_der_04").remove();
	}
	
	setTimeout(function() {
		deleteOnClick();
	}, 1000);
}