// ==UserScript==
// @name           Ocean Fill for Cutthroat Theme
// @autor          Victor Exsecrati
// @email          victorexsecrati@gmail.com
// @namespace      Ikariam
// @description    Fills in the background of the city view with an ocean so that if your running scripts that extend the city window water fills the bottom. This Script is made with a darker ocean so that it will look good with the Cutthroat theme.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

//GM_addStyle("");



var URL= "http://img5.imageshack.us/img5/";


GM_addStyle("#city #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://i723.photobucket.com/albums/ww239/RMcKay0/Ocean%20Fill/bgcontent1.jpg);text-align:left;}");
GM_addStyle("#city #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://i723.photobucket.com/albums/ww239/RMcKay0/Ocean%20Fill/bgfootercopy.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#island #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img5.imageshack.us/img5/7774/bgcontent.jpg);text-align:left;}");
GM_addStyle("#island #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img5.imageshack.us/img5/2718/bgfooter.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#worldmap_iso #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img5.imageshack.us/img5/7774/bgcontent.jpg);text-align:left;}");
GM_addStyle("#worldmap_iso #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img5.imageshack.us/img5/2718/bgfooter.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");
