// ==UserScript==
// @name       Battlelog serverbrowser region fix
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  Fixes the resetting of the custom region filter in the battlefield 4 serverbrowser
// @match      http://battlelog.battlefield.com/bf4/*
// @copyright  Public domain
// ==/UserScript==

function bindClick() {
	jQuery("div.filters-container button:submit").click(function(data, fn) 
	{
		var form = jQuery("#serverbrowser-filters");

		jQuery("input[name=country]").remove();

		for(var i = 0; i < Surface.globalContext.filterCountrySettings.length; i++)
		{
			var input = $("<input>").attr("type", "hidden").attr("name", "country").val(Surface.globalContext.filterCountrySettings[i]);
			form.append(input);
		}
    
		console.log(jQuery("input[name=country]"));
	});
}

jQuery( document ).ready(function() {
	jQuery("#content").bind('DOMNodeInserted', function(event) { 
		var element = $(event.target);
		if(element.is("section#serverbrowser"))
		{
			bindClick();
		}
	});
    
	bindClick();
});