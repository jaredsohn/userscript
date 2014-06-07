// ==UserScript==
// @name           Fark Ad Remover
// @namespace      http://userscripts.org/scripts/show/34997
// @description    Removes Ads From Fark
// @include        http://*.totalfark.com/*
// @include        http://totalfark.com/*
// @include        http://*.fark.com/*
// @include        http://fark.com/*

// ==/UserScript==


function removeDOM_id(element)
{
        var e = document.getElementById(element);
        e.parentNode.removeChild(e);
}

window.addEventListener("load",	 function(e) {
	removeDOM_id('rightAd300x250');
	removeDOM_id('rightSideRightMenubar');
	removeDOM_id('topAd728x90');
	removeDOM_id('BoxSwaps');
	var hdr = document.getElementById('headerTop');
	var logo = document.getElementById('mainLogo');
	if( logo.src.indexOf("totalfark") > 0 )
		hdr.style.height='70px';
	else
		hdr.style.height='105px';
	var bdy = document.getElementById('bodyHeadlineContainer')
	bdy.style.margin='0 165px 15px 0';
	var bdy2 = document.getElementById('bodyRightSideContainer')
	bdy2.style.width='150px';
}, false);
