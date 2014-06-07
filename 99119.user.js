// ==UserScript==
// @name           us3rscr1pt - Shufuni Get Video 2011/03
// @namespace      http://www.shufuni.com/*
// @description    Download Videos from Shufuni
// @include        http://www.shufuni.com/*
// ==/UserScript==

function get_flv_url()
{
    var line = document.getElementById('bg_player_location').innerHTML;
    var url = line.substring(line.indexOf("CDNUrl=")+7, line.indexOf("&amp;CDN_HD_Url="));
    return url;
}

var lnk_dl = document.createElement("a");
lnk_dl.href = get_flv_url();
lnk_dl.appendChild(document.createTextNode("Download this video (right click, save as)"));

document.getElementById("bg_player_location").appendChild(lnk_dl);
