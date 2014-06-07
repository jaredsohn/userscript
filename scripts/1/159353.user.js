// ==UserScript==
// @name       Stadium-Live Player hax0r
// @namespace  stadium-live
// @version    0.3
// @description  Sets the correct width for the iframe and player. Removes some overlays too!
// @match      http://www.stadium-live.com/ch_*code.html
// @match      http://www.hdmytv.com/embed.php*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  2013+, Michael Nowak
// ==/UserScript==

jQuery(document).ready(function() {
    var player = jQuery("#jwplayer1");
    var width = "640";
    if (player.length == 1) {
	    player.width(width + "px");
        player.find("embed:first").attr("width", width);
        jQuery("div[id^=\"total\"], #dvBlock").remove();
    } else {
        jQuery("iframe:first").attr("width", width);
        jQuery("#floatLayer1").remove();
    }
});