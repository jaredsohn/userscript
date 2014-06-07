// ==UserScript==
// @name          Meebo Wallpaper Changer
// @author        Parashuram
// @namespace     http://wallpaper.meebo.user.js
// @description   Changes the wallpaper of the meebo page
// @include       http://www*.meebo.com/*
// @include       https://www*.meebo.com/*
// ==/UserScript==

(function()
{
	GM_registerMenuCommand('ChangeWallpaper', changerFunction);
		
	changerFunction();
	function changerFunction()
	{
		document.getElementById('body').style.background='url("' + getWallPaperUrl() +'");';
	}
	
	function getWallPaperUrl()
	{
		var meeboWallPaper = null;
		if (!GM_getValue('meeboWallPaper')) 
		{
			meeboWallPaper = prompt("Please type in the URL of the wallpaper");
			GM_setValue('meeboWallPaper', meeboWallPaper);
		} 
		else 
		{
			meeboWallPaper = GM_getValue('meeboWallPaper');
		}
		return meeboWallPaper;
	}
})();

