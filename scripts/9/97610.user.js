// ==UserScript==
// @name manyaq1203.user
// @namespace [173166]-[yenile]-v1.0.0
// @description This is a simple script, it will refresh the page every x seconds
// @include http://apps.facebook.com/kingdomsofcamelot/?s=183
// @CodedBy manyaq1203
// @Website 
// @UserScripts http://UserScripts.org/users/manyaq1203
// @license Free
// @version 1.0.0
// ==/UserScript==

	//===[Settings]===\\
		var StRefTime = '120';  //==[Set time by seconds]
	//===[/Settings]===\\
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);