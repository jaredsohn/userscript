// ==UserScript==
// @name       Steamcommunity market item show gem
// @namespace  http://use.i.E.your.homepage/
// @version    1
// @description  This script will display gems for item on the steam community market
// @match      http://steamcommunity.com/market/listings/570/*
// @copyright  2014+, Anzulo
// ==/UserScript==

// Small helper class
var anzuloUtils = function() {
	var that = this;

	that.extractDataFromHref = function(href) {
		var myRegexp = /\('.*', '(.*)', (.*), '(.*)', '(.*)'\)/g;
		var match = myRegexp.exec(href);
		if (match.length < 1) {
			console.error("Something went wrong matching Regexp to href: ", href);
		};

		return {
			id: match[1],
			appId: match[2],
			contextId: match[3],
			assetId: match[4],
		};
	};
}
var aUtils = new anzuloUtils();

function displayGems() {
	// Find all action buttons. We need them to extract information from the href attribute
	var marketActionButtonList = jQuery('.item_market_action_button.item_market_action_button_green');
	
	// Extact and map the data from the href. This will make using the data way easier.
	var foundElements = jQuery.map(marketActionButtonList, function(item, index) {
		var href = jQuery(item).attr('href');
		return aUtils.extractDataFromHref(href);
	});

	// Find and inject the description from the assert
	jQuery.each(foundElements, function(index, el) {
		var assert = g_rgAssets[el.appId][el.contextId][el.assetId];

		// find gem text in one of descriptions
		for (var i = assert.descriptions.length - 1; i >= 0; i--) {
			if (assert.descriptions[i].value.indexOf("Gem") > 0) {
				el.description = assert.descriptions[i].value;
			};
		};

		// fall back if the above does not work
		//if (!el.description)
		//	el.description = assert.descriptions[1].value;
	});

	// Append description to the ui
	jQuery.each(foundElements, function(index, el) {
		var row = jQuery('#listing_' + el.id);
		row.append(jQuery('<div class="market_listing_item_name_block item_description">').html(el.description));
		row.append(jQuery('<div style="clear:both;">'));
	});

	// Make small adjustments to the design
	jQuery('.market_listing_item_name_block').css('float', 'left');
	jQuery('.market_listing_row')
		.css('min-height', jQuery('.market_listing_row').css('height'))
		.css('height', 'auto');
	jQuery('.item_description').css('margin-top', 0);
};

jQuery(document).ready(function() {
	displayGems();

	// hook ajax response function and run displayGem on pageswitch
	g_oSearchResults.OnResponseRenderResults2 = g_oSearchResults.OnResponseRenderResults;
	g_oSearchResults.OnResponseRenderResults = function(transport) {
		g_oSearchResults.OnResponseRenderResults2(transport);
		displayGems();
	}
});