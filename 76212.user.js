// ==UserScript==
// @name          Justin.TV Widescreen Archive/Highlight Clip Video Player
// @author        Sujay
// @namespace     http://userscripts.org/users/sujayt
// @description	  This script will resize the JTV archive clip and highlights video player to the widescreen format. http://userscripts.org/scripts/show/76212
// @include       http://*justin.tv/*/b/*
// @version       1.1.4
// ==/UserScript==

// Last edited 08-26-2010

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#archive_highlight_player_flash,.archive_highlight_player_container,#archive_site_player_flash,.archive_site_player_container,#player,.processing{width:640px!important;height:400px!important;}#left_column{width:640px;float:left;margin-right:0!important;padding-right:0;}#right_column{width:300px!important;float:right!important;}textarea#message{width:270px!important;}.managed_ad,#go_pro_link a{display:none;}#wrapper{margin-top:0;}');