// ==UserScript==
// @name           Resource production
// @namespace      Ikariam
// @version        0.6
// @downloadURL    https://userscripts.org/scripts/source/81211.user.js
// @updateURL      https://userscripts.org/scripts/source/81211.meta.js
//
// @include        http://*.ikariam.*/index.php*
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js
//
// @history        07/31/2012 0.6 Updates the wine spending correctly when changing city.
// @history        07/22/2012 0.5 Updates the production display correctly when changing city.
// @history        06/30/2012 0.4 ikariam v0.5 only, update for new june 2012 version.
// @history        04/21/2012 0.3 Bug fix for ikariam v0.5.0
// @history        04/19/2012 0.2 Updated for future ikariam 0.5.0
// @history        0.1 Initial release
// ==/UserScript==

GM_addStyle('span.resourceProduction {font-size:70%;position:absolute;bottom:5px;right:30px}');

var ResourceProduction = new function() {

	function addProd(position, value) {
		// Ikariam arrondit à l'entier inférieur. Mais parfois la multiplication par 3600 donne un résultat légèrement inférieur,
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
	this.createSpan = function(n) {
		var ids = ['wood', 'wine', 'marble', 'glass', 'sulfur'];
		if($('span#rp'+n).length == 0) {
			$('#cityResources li[id="resources_'+ids[n]+'"]')
				.css({'line-height':'normal','padding-top':'4px'})		// 1 pixel up
				.append('<span id="rp'+n+'" class="resourceProduction"></span>');
		}
	}

	// Change city production from marble to sulfur etc.
	this.repositionSpan = function(newTradegood) {
		var oldTradegood = unsafeWindow.ikariam.model.producedTradegood;
		// Change needed ?
		if(newTradegood != oldTradegood) {
			// Delete old span if it was not wine (NEVER remove the wine span).
			if(oldTradegood > 1) {
				$('span#rp'+oldTradegood).remove();
			}
			// Create new span
			this.createSpan(newTradegood);
		}
	}

	this.updateProd = function() {
		addProd(0, unsafeWindow.ikariam.model.resourceProduction*3600);
		if(unsafeWindow.ikariam.model.cityProducesWine) {
			addProd(1, unsafeWindow.ikariam.model.tradegoodProduction*3600 - unsafeWindow.ikariam.model.wineSpendings);
		}
		else {
			// Quand on distribue du vin sur une île qui n'en produit pas
			addProd(1, -unsafeWindow.ikariam.model.wineSpendings);
			addProd(unsafeWindow.ikariam.model.producedTradegood, unsafeWindow.ikariam.model.tradegoodProduction*3600);
		}

	}
}

$(function(){
	// See http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Avoid_Common_Pitfalls
	// ikariam version >= 0.5.0
	ResourceProduction.createSpan(0);
	ResourceProduction.createSpan(1);
	ResourceProduction.createSpan(unsafeWindow.dataSetForView.producedTradegood);
	ResourceProduction.currentTradegood = unsafeWindow.dataSetForView.producedTradegood;
	ResourceProduction.updateProd();

	unsafeWindow.ikariam.model.ResourceProduction_updateGlobalData = unsafeWindow.ikariam.model.updateGlobalData;
	unsafeWindow.ikariam.model.updateGlobalData = function(dataSet) {
		ResourceProduction.repositionSpan(dataSet.producedTradegood);
		unsafeWindow.ikariam.model.ResourceProduction_updateGlobalData(dataSet);
		ResourceProduction.updateProd();
	}

});