// ==UserScript==
// @name        Monster iLive
// @version    0.04
// @description Get the full screen
// @author	TracerMan
// @updateURL https://userscripts.org/scripts/source/485750.meta.js
// @downloadURL https://userscripts.org/scripts/source/485750.user.js
// @include        *://*.ilive.to/view/*
// @exclude        *://www.ilive.to
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

//--- Remove Junk
$("#ad_overlay").remove();
$("#ad_footer").remove();
$(".center").remove();
$("#belowplayer").remove();
$(".rightcol").remove();
$("#header").remove();
$("#nav").remove();
$("#footer").remove();
$("#fb-root").remove();
$("table").remove();
$(".fb_iframe_widget").remove();
$(".fb_iframe_loader").remove();
$(".fb-like").remove();
$("p").remove();
$("script").remove();
$("span").remove();

//--- Page Modifications
$("#wrapper").css("margin", "0px").css("width", "auto");
$("#content").css("margin", "0px").css("min-height", "0px").css("padding", "0px");
$("#main").css("padding", "0px");
$("#player_container").css("z-index", "999").css("height", "100%").css("width", "100%").css("position", "fixed").css("top", "0").css("bottom", "0").css("left", "0").css("right", "0");
$(".fb_iframe_widget").css("opacity", "0");
