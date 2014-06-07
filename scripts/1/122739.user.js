// ==UserScript==
// @name           Edgeworld refresher
// @namespace      MaxwellLipphardt
// @include        *www.kabam.com/edgeworld/play*
// @include        *apps.facebook.com/edgeworld/*
// ==/UserScript==

	//===[Settings]===\\
		var StRefTime = '600';  //==[Set time by seconds]
	//===[/Settings]===\\
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);