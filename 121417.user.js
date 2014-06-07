// ==UserScript==
// @name       Can't get enough of winter (youtube)
// @namespace  http://www.twitter.com/#/LittleJennaIsMe
// @version    1.0
// @description  Can't get enough of winter on youtube? Then install this script, and enjoy a snowy winter on all videos on the site. Can't guarantee it'll work as youtube makes changes to the player, but for now, it works.
// @include    http://www.youtube.com/*
// @require    http://code.jquery.com/jquery-1.7.1.min.js
// @copyright  2011, Jenna
// ==/UserScript==

$(document).ready(function(){
    
    
    var as = $("embed").attr("flashvars") + "&amp;xmas_module=http%3A%2F%2Fs.ytimg.com%2Fyt%2Fswfbin%2Fxmas-vfljYH85s.swf&amp";
    var source = $("embed").attr("src");
    
    document.getElementById("watch-player").innerHTML = "<embed type=\"application/x-shockwave-flash\" src=\"" + source + "\" width=\"640\" id=\"movie_player\" height=\"390\" flashvars=\"" + as + "\" allowscriptaccess=\"always\" allowfullscreen=\"true\" bgcolor=\"#000000\">";
    
});
