// ==UserScript==
// @name            Random Creature LevelUP for Avadopts
// @description    Clicks randomcreature for leveling up on Avadopts
// @include         http://avadopts.com/*
// @include         http://www.avadopts.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

//--- Note that the contains() text is case-sensitive.
var TargetLink              = $("a:contains('Give a random creature a level!')");

if (TargetLink  &&  TargetLink.length)
    window.location.href    = TargetLink[0].href;
