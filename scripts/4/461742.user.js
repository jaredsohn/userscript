// ==UserScript==
// @name Auto Refresh
// @namespace [AutoRefreshMAL]-v1.0.0
// @description Refreshes the MAL comments page on clubs every 30 seconds.
// @include http://myanimelist.net/clubs.php?id=*
// @CodedBy AyoobAli fix by AnoPla
// @Website http://www.AyoobAli.com
// @UserScripts http://UserScripts.org/users/AyoobAli
// @license Free
// @version 1.0.0
// ==/UserScript==

	//===[Settings]===\\
		var StRefTime = '30';  //==[Set time by seconds]
	//===[/Settings]===\\
    
    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);