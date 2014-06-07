// ==UserScript==
// @name D2L - Simple
// @namespace http://userscripts.org/users/509235
// @description Script to simplify D2L UI.
// @include https://learn.uwaterloo.ca/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant none
// @version 1
// ==/UserScript==

jQuery(".d2l-background-global").remove();
jQuery(".d2l-background-left").remove();
jQuery(".d2l-background-right").remove();
jQuery(".d2l-minibar").css("background-color", "#2B2B2B");
jQuery(".d2l-max-width").css("max-width", "1280px");
