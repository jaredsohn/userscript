// ==UserScript==
// @name            Hack Forums tcat fix
// @namespace       Snorlax
// @description     Removes wrapping from the tcat class
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

$(".tcat").css("white-space","nowrap");