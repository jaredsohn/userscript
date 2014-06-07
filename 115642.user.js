// ==UserScript==
// @name R3fr3sh
// @description R3fr3sh
// @include http://www.ogame.us/*
// @CodedBy R4wll3r
// @UserScripts http://UserScripts.org/users/Rawler
// @license Free
// @version 1.0.0
// ==/UserScript==

	//===[Settings]===\\
		var StRefTime = '30';  //==[Set time by seconds]
	//===[/Settings]===\\
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);