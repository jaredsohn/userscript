// ==UserScript==
// @name           Ocean Fill
// @autor          Dante DeGraaf
// @email          dantedegraaf@gmail.com
// @namespace      Ikariam
// @description    Fills in the background of the city view with an ocean so that if youre running scripts that extend the city window water fills the bottom.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

//GM_addStyle("");



var URL= "http://i221.photobucket.com/albums/dd189/geoSpartan/ikariam";


GM_addStyle("#city #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url("+URL+"/bg_content-1.jpg);text-align:left;}");
GM_addStyle("#city #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url("+URL+"/bg_footer1.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#island #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url("+URL+"/bg_content.jpg);text-align:left;}");
GM_addStyle("#island #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url("+URL+"/bg_footer.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#worldmap_iso #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url("+URL+"/bg_content.jpg);text-align:left;}");
GM_addStyle("#worldmap_iso #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url("+URL+"/bg_footer.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");
