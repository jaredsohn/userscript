// ==UserScript==
// @name          KiMMyLand.user.js
// @namespace     http://www.erepublik.com/
// @description   Puts Kosovo and Metohija image as a MY LAND SERBIA. :D
//		http://i913.photobucket.com/albums/ac332/Radivoj_NS/MyLandKosovoiMetohijajeSrbija.jpg
// @include       http://www.erepublik.com/*
// @include       http://economy.erepublik.com/*
// ==/UserScript==


	var oLiMenuMyLand = document.getElementById('menu2');
	if( null == oLiMenuMyLand )
		return false;
		
	var oLinkWrapper	= oLiMenuMyLand.getElementsByTagName("A");
	if( null == oLinkWrapper )
		return false;


	var oImage = document.createElement('IMG');

	oImage.setAttribute('SRC', 'http://i913.photobucket.com/albums/ac332/Radivoj_NS/KiMjeSrbija_b.png' );
	oImage.style.position="relative";
	oImage.style.top="6px";
	oImage.style.left="68px";
	
	oLinkWrapper[0].appendChild( oImage ); 