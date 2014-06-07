// ==UserScript==
// @name           Uploads Only Pls
// @description    Redirects you to the 'Uploads only' page of Youtube automatically.
// @version        1.3
// @author         TH3PF
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @grant          none
// @history        1.0 First version
// @history        1.1 Partially rewritten, more text replacement
// @history        1.2 Will now only redirect the links to feeds
// @history        1.3 Fixed guide panel links on videos, added an auto redirect function
// ==/UserScript==

// ============================================================================
// Adaptive CSS filter configuration (fixed various layout bugs caused by
// evolving youtube layout design, and interfering user scripts).
// ============================================================================


$(function(){
	//Customization
	var autoRedirect = false;					//Whether or not you want the 'What to watch' page to redirect to 'My subscriptions' automatically. Change 'false' to 'true' in that case.
	var title = 'Youtube | Uploads';			//The title of the webbrowser tab and the mouseover text of the Youtube button.
	var region = 'Upl.';						//This is the text besides the Youtube button.
	//End of customization ( not really :) )

	var contentRegion = document.getElementsByClassName('content-region')[0];
	var logoContainer = document.getElementById('logo-container');			
	var guideItems = document.getElementsByClassName("guide-item ");
	var selectedGuideItem = document.getElementsByClassName('guide-item guide-item-selected ')[0];
	
	//Youtube logo (Global)
	logoContainer.href = "/feed/subscriptions/u";
	logoContainer.title = title;
	
	if(region.length != 0)
	{
		//Content region
		contentRegion.innerHTML = region;
		contentRegion.style.textDecoration = "inherit";
		contentRegion.style.left = "73px";
	}
	
	if(guideItems.length != 0)
	{
		//Subscription items
		for (var i = 0; i < guideItems.length; i++)
		{
			if(guideItems[i].href.indexOf("feed") == -1) continue;
			guideItems[i].href += "/u";
		}
	}
	
	if(selectedGuideItem != null)
	{
		//Auto redirect
		if(autoRedirect && selectedGuideItem.href.indexOf("what_to_watch") != -1 )
			window.location.href = '/feed/subscriptions/u';
	
		//Reset title
		if(selectedGuideItem.href.indexOf("subscriptions") != -1 && title.length != 0)
			document.title = title;
	}
});
