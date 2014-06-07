// ==UserScript==
// @name           Imgur - Album throttle load disabled
// @author         Sasa Milosevic
// @namespace      Sasa
// @include        http://imgur.com/a*
// @require  	   http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$("img.unloaded").each(function()
{
    $(this).attr("src",$(this).data("src"));
})
