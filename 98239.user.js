// ==UserScript==
// @name          SJeBastichno.user.js
// @namespace     http://www.erepublik.com/
// @description   SJeBastichno 
// @include       http://www.erepublik.com/*
// @include       http://economy.erepublik.com/*
// ==/UserScript==


	var oDivContent	= document.getElementById('sidebar_missions');

	var arrayImages = oDivContent.getElementsByTagName('img');
	for (var i = 0; i < arrayImages.length; i++)
	{
		oImage	= arrayImages[i];
		if( oImage.src == "http://www.erepublik.com/images/modules/missions/pop.png" )
		{
			arrayImages[i].src = "http://static.erepublik.com/uploads/avatars/Companies/2009/12/23/826b09e1c06058f264f661a967fb6e50_55x55.jpg";
		}
	}
