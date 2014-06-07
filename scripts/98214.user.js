// ==UserScript==
// @name          RemoveBlinking.user.js
// @namespace     http://www.erepublik.com/
// @description   Remove Blinking !!!!!!!!! http://www.erepublik.com/images/modules/missions/pop.png
// @include       http://www.erepublik.com/*
// @include       http://economy.erepublik.com/*
// ==/UserScript==


	var oDivContent	= document.getElementById('sidebar_missions');

	var arrayImages = oDivContent.getElementsByTagName('img');
	for (var i = 0; i < arrayImages.length; i++)
	{
		oImage	= arrayImages[i];
		if( oImage.src == "http://www.erepublik.com/images/modules/missions/pop.png" )
			oDivContent.removeChild( oImage );
	}
