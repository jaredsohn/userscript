// ==UserScript==
// @name           hide real name on battle.net
// @namespace      http://userscripts.org/users/247376
// @include        http://*.battle.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
    
$(document).ready(function () {
    var $welcome = $(".service-welcome"),
        $playername = $(".player-name");
    if ($welcome) {
        $welcome.html($welcome.html().replace(/(.+), (.+)/, "$1, Anonymous"));
    }
    if ($playername) {
        $playername.html("Anonymous Player");
    }
});
