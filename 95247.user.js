// JavaScript Document
// ==UserScript==
// @name           Ikariam Resource Quicklinks
// @autor          holyschmidt (http://userscripts.org/users/holyschmidt)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/52359
// @description    Create Quicklinks to island resources views
// @include        http://s*.ikariam.*/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamMap-Id_Luxury_Name.js
// @version        1.0.4
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

// Version 1.0.4 - Feature: Added quicklink to Town Hall.
// Version 1.0.3 - Feature: Tradegoods are now read from (once) from IkariamMap-Id_Luxury_Name.js and saved away to limit query requirements.
// Version 1.0.2 - Bugfix: Added additional specification to jQuery when getting resource nodes
// Version 1.0.1 - Feature: Add styling and quicklinks to each resource
// Version 1.0.0 - Initial Framework 

const cache_key = getServerDomain() + '.' + getServerWorld() + '.TradeGood';

/* Add Updater and Quicklinks for updating script */
new IkariamUserScriptUpdater( 52359, "Ikariam Resource Quicklinks" );

ResourceQuicklinks = {
	init:function()
	{
		$('#cityNav')[0].style.height = "10px";
		var town = $("#citySelect option[selected='selected']")[0].value;
		var island = $("li.viewIsland a").attr("href").substr($("li.viewIsland a").attr("href").indexOf("id=") + 3);

		$('#cityResources ul.resources li.wood')
			.hover(function() { $(this).attr('style', 'text-shadow:none; text-shadow:#666 2px 2px 2px; color:#000; cursor: pointer;'); },
			       function() { $(this).attr('style', ''); })
			.click(function() { window.location = '?view=resource&type=resource&id=' + island; });

		var tradeGood = ResourceQuicklinks.readTradeGood(island);
		$('#cityResources ul.resources li.' + tradeGood)
			.hover(function() { $(this).attr('style', 'text-shadow:none; text-shadow:#666 2px 2px 2px; color:#000; cursor: pointer;'); },
			       function() { $(this).attr('style', ''); })
			.click(function() { window.location = '?view=tradegood&type=tradegood&id=' + island; });

		var oldStyle = $('#cityResources ul.resources li.population #value_inhabitants').attr('style');
		$('#cityResources ul.resources li.population')
			.hover(function() { $('#value_inhabitants', this).attr('style', oldStyle + 'text-shadow:#666 2px 2px 2px; color:#000; cursor:pointer;'); },
			       function() { $('#value_inhabitants', this).attr('style', oldStyle); })
			.click(function() { window.location = '?view=townHall&id=' + town + '&position=0'; });
	},
	findTradeGood:function(island) 
	{
		var ikariamMap = getIslandMap();
		for (var x = 1; x <= 100; x++) {
			for (var y = 1; y <= 100; y++) {
				if (ikariamMap[x][y] && ikariamMap[x][y][0] == island) {
					var good;
					switch ( ikariamMap[x][y][1] ) {
					case 1: good = 'wine'; break;
					case 2: good = 'marble'; break;
					case 3: good = 'glass'; break;
					case 4: good = 'sulfur'; break;
					}
					return good;
				}
			}
		}
		return '';
	},
	readTradeGood:function(island) 
	{
		var tradeGood = GM_getValue(cache_key + '.' + island, '');
		if (tradeGood == '' || $("#cityResources ul.resources li." + tradeGood).contents().length == 0) {
			tradeGood = ResourceQuicklinks.findTradeGood(island);
			GM_setValue(cache_key + '.' + island, tradeGood);
		}
		return tradeGood;
	}
}

ResourceQuicklinks.init();
