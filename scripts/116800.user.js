// ==UserScript==
// @name          WellcomeToRSrpska.user.js
// @namespace     http://www.erepublik.com/
// @description   Puts Wellcome To Republic Srpska image as a COMMUNITY addtion to menu. :D
//	http://i913.photobucket.com/albums/ac332/Radivoj_NS/DobroDosliuRSrpsku.png
// @include       http://www.erepublik.com/*
// @include       http://economy.erepublik.com/*
// ==/UserScript==


	var oLiMenuMyLand = document.getElementById('menu5');
	if( null == oLiMenuMyLand )
		return false;
		
	var oLinkWrapper	= oLiMenuMyLand.getElementsByTagName("A");
	if( null == oLinkWrapper )
		return false;

		
	var oImage 			= document.createElement('IMG');

	oImage.setAttribute('SRC', 'http://i913.photobucket.com/albums/ac332/Radivoj_NS/DobroDosliuRSrpsku.png' );
	oImage.style.position="relative";
	oImage.style.top="9px";
	oImage.style.left="88px";
	
	oLinkWrapper[0].appendChild( oImage ); 

