// ==UserScript==
// @name       Steam Market: Strange Item Helper
// @version    1.0
// @description  Display stats of strange items below item name (Dota 2)
// @include      http://steamcommunity.com/market/listings/*
// @copyright  2012+, Summ
// ==/UserScript==

var _strange_color = "cf6a32";

function adjustPage()
{
    for ( var listing in g_rgListingInfo ) {
		var asset = g_rgListingInfo[listing].asset;
		if ( typeof g_rgAssets[asset.appid][asset.contextid][asset.id] != 'undefined' )
		{
            var element = document.getElementById("listing_" + listing + "_name");
			if(element)
            {
                var strangeString = "";
                if(g_rgAssets[asset.appid][asset.contextid][asset.id].descriptions) {
                    for(var i = 0; i < g_rgAssets[asset.appid][asset.contextid][asset.id].descriptions.length; i++)
						if(g_rgAssets[asset.appid][asset.contextid][asset.id].descriptions[i].color && g_rgAssets[asset.appid][asset.contextid][asset.id].descriptions[i].color.toLowerCase() == _strange_color)
							strangeString += " - " + g_rgAssets[asset.appid][asset.contextid][asset.id].descriptions[i].value;
                }
                
                if(strangeString.length > 0)
                    element.innerHTML += "<br/>" + strangeString;
            }
		}
	}
}

function onChangePage()
{
    adjustPage();
}

if(g_oSearchResults)
{
    var handler = g_oSearchResults.m_fnPageChangedHandler;
    g_oSearchResults.SetPageChangedHandler(function() {
	if(handler)
            handler();
       
        onChangePage();
    });
}

adjustPage();