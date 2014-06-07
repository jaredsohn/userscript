// ==UserScript==
// @name            Hack Forums Profile star remover
// @namespace       Snorlax
// @description     Removes the stars that are grey on profiles
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

$(".userstars").css("background", "transparent");