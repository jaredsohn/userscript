// ==UserScript==
// @name Auto Refresh
// @namespace [173166]-[AutoRefresh]-v1.0.0
// @description This is a simple script, it will refresh the page every x seconds
// @include http*://ExampleWebSiteInHere.com/Anything/AnyPage.php
// @include http://*.pokemon-vortex.com/map.php?map=*
// @include http://*.pokemon-vortex.com/wildbattle.php*
// @include http://*.pokemon-vortex.com/battle_select.php?type=member*
// @include http://*.pokemon-vortex.com/battle.php*
// @exclude http://*.pokemon-vortex.com/adv.php*
// @CodedBy AyoobAli
// @Website http://www.AyoobAli.com
// @UserScripts http://UserScripts.org/users/AyoobAli
// @license Free
// @version 1.0.0
// ==/UserScript==

	//===[Settings]===\\
		var StRefTime = '10';  //==[Set time by seconds]
	//===[/Settings]===\\
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);