// ==UserScript==
// @name           Ikariam bottom fill
// @version 	   0.4
// @namespace 	   Ikariam version 0.3.x
// @autor          Edited by Randalph
// @e-mail         randalthor.ikariam@gmail.com
// @description    Ikariam bottom fill remplit le blanc causé par l'utilisation  des scripts  
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://ns10.freeheberg.com/~r4phael/ikariam/ikariam_bottom_fill/Ikariam_bottom_fill.user.js
// @require        http://buzzy.260mb.com/AutoUpdater.js
// @version 0.4
// ==/UserScript==
// ===========================================================================

//22-04-2009

// ---- This script developped for Ikariam version 0.3.x ----
// ---- To contact a Scrip Administrator ; randalthor.ikariam@gmail.com ----  



// ---- Version 0.4 for Ikariam ---- 
// ---- (CSS) ---- 


GM_addStyle( '#city #container2 	{position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:				url(http://ns10.freeheberg.com/~r4phael/ikariam/ikariam_bottom_fill/bg_content.jpg);	text-align:left;}');
GM_addStyle( '#city #footer 		{clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:	url(http://ns10.freeheberg.com/~r4phael/ikariam/ikariam_bottom_fill/bg_footer.jpg);	font-size:11px;font-weight:bold;color:#edd090;text-align:right;}');

GM_addStyle( '#island #container2 	{position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:				url(http://ns10.freeheberg.com/~r4phael/ikariam/ikariam_bottom_fill/bg_content.jpg);	text-align:left;}');
GM_addStyle( '#island #footer 		{clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:	url(http://ns10.freeheberg.com/~r4phael/ikariam/ikariam_bottom_fill/bg_footer.jpg);	font-size:11px;font-weight:bold;color:#edd090;text-align:right;}');

GM_addStyle( '#worldmap_iso #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:				url(http://ns10.freeheberg.com/~r4phael/ikariam/ikariam_bottom_fill/bg_content.jpg);	text-align:left;}');
GM_addStyle( '#worldmap_iso #footer	{clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px;background-image:	url(http://ns10.freeheberg.com/~r4phael/ikariam/ikariam_bottom_fill/bg_footer.jpg);	font-size:11px;font-weight:bold;color:#edd090;text-align:right;}');
autoUpdate (58988, "0.4");