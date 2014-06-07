// ==UserScript==
// @name           GLB Change Multi Boost Default 
// @namespace      GLB
// @description    Changes Multi Boost Page to all be none
// @include        http://goallineblitz.com/game/multi_boost_player.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/latest/ui/ui.core.js
// ==/UserScript==


$(document).ready(function(){

    $('select', $('table:first')).each(function(t){
        //select first option
        $("option:first", $(this)).attr('selected','selected');
        //call onchange event
        var playerid = $(this).attr('id');
        playerid = playerid.substring(playerid.indexOf('_')+1);
        unsafeWindow.checkButton(playerid);
    })
})
