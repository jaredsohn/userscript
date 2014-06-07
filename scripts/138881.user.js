// ==UserScript==
// @name           Resource production
// @namespace      Ikariam
// @version        0.4
// @downloadURL    https://userscripts.org/scripts/source/138881.user.js
// @updateURL      https://userscripts.org/scripts/source/138881.meta.js
//
// @include        http://*.ikariam.gameforge.*/index.php*
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js
//
// @history        06/30/2012 0.4 ikariam v0.5 only, update for new june 2012 version.
// @history        04/21/2012 0.3 Bug fix for ikariam v0.5.0
// @history        04/19/2012 0.2 Updated for future ikariam 0.5.0
// @history        0.1 Initial release
// ==/UserScript==

GM_addStyle('span.resourceProduction {font-size:70%;position:absolute;bottom:5px;right:30px}');

function addProd(position, value) {
	// Ikariam arrondit ? l'entier inférieur. Mais parfois la multiplication par 3600 donne un résultat lég?rement inférieur,
	// par exemple 29.999999999988002 au lieu de 30
	value = Math.floor(value + 0.001);
	if(value>0)
		$('span#rp'+position).css('color','green').text(' +'+value);
	else if(value<0)
		$('span#rp'+position).css('color','red').text(' '+value);
	else
		$('span#rp'+position).css('color','gray').text(' +0');
}

// Creates spans in the resource bar.
function init(n) {
	var ids = ['wood', 'wine', 'marble', 'glass', 'sulfur'];
	if($('span#rp'+n).length == 0) {
		$('#cityResources li[id="resources_'+ids[n]+'"]')
			.css({'line-height':'normal','padding-top':'4px'}) // remonte la valeur d'1 pixel
			.append('<span id="rp'+n+'" class="resourceProduction"></span>');
	}
}

function updateProd() {
//alert(unsafeWindow.ikariam.model.resourceProduction+'\n'+unsafeWindow.ikariam.model.tradegoodProduction+'\n'+unsafeWindow.ikariam.model.wineSpendings+'\n'+unsafeWindow.dataSetForView.producedTradegood);
	addProd(0, unsafeWindow.ikariam.model.resourceProduction*3600);
	if(unsafeWindow.ikariam.model.cityProducesWine) {
		addProd(1, unsafeWindow.ikariam.model.tradegoodProduction*3600 - unsafeWindow.ikariam.model.wineSpendings);
	}
	else {
		// Quand on distribue du vin sur une ?le qui n'en produit pas
		addProd(1, -unsafeWindow.ikariam.model.wineSpendings);
		addProd(unsafeWindow.dataSetForView.producedTradegood, unsafeWindow.ikariam.model.tradegoodProduction*3600);
	}

}

$(function(){
	// L'objet unsafeWindow permet d'accéder aux scripts de la page d'origine, alors que window ne le permet pas.
	// Voir http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Avoid_Common_Pitfalls
	// ikariam version >= 0.5.0
	init(0);
	init(1);
	init(unsafeWindow.dataSetForView.producedTradegood);
	updateProd();
	unsafeWindow.ikariam.model.ResourceProduction_updateGlobalData = unsafeWindow.ikariam.model.updateGlobalData;
	unsafeWindow.ikariam.model.updateGlobalData = function(dataSet) {
		unsafeWindow.ikariam.model.ResourceProduction_updateGlobalData(dataSet);
		updateProd();
	}

});