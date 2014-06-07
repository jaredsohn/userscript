// ==UserScript==
// @name           GLB Change Page Title
// @namespace      GLB
// @description    Change page title to match 
// @include        http://goallineblitz.com/game/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/latest/ui/ui.core.js
// ==/UserScript==



$(document).ready(function(){

    var newtitle = $('div[class*="big_head"]:first').text();

    newtitle.replace('(Team Colors)','');

    if (window.location.href.indexOf('http://goallineblitz.com/game/player.pl?player_id=')>-1) {

        //get agent name
        var agentname = $('a[href*="/game/home.pl?user_id="]:first').text();

        newtitle = agentname + '>' + newtitle;
    }

    //newtitle = 'GLB: ' + newtitle;

    document.title = newtitle;

});

