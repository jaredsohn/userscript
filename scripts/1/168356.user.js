// ==UserScript==
// @name            HearthPwn & WoWDB Reddit Tooltips
// @version         1.1
// @description     Adds tooltips to database links for HearthPwn.com and WoWDB.com on reddit
// @include         http://*reddit.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @copyright       Robert "Fluxflashor" Veitch
// ==/UserScript==

// History
//  - 1.0 Initial Release

$(document).ready(function() {
    
    // World of Warcraft Tooltips
    $.getScript("http://static-azeroth.cursecdn.com/current/js/syndication/tt.js", function(){
        // Hearthstone Tooltips (Requires WoW TT to be loaded)
        $.getScript("http://media.mmo-champion.com/js/hearth.js");
    });
})