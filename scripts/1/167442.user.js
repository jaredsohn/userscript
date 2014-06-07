// ==UserScript==
// @name        D2L - CHE
// @namespace   
// @description Script to D2L UI wider
// @include     https://learn.uwaterloo.ca/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant             none
// @version     0.1
// ==/UserScript==

jQuery(".d2l-background-global").remove();
jQuery(".d2l-background-left").remove();
jQuery(".d2l-background-right").remove();
jQuery(".d2l-minibar").css("background-color", "#2B2B2B");
jQuery(".d2l-max-width").css("max-width", "100%");
jQuery(".d2l-navbar-container.d_nb_cMiddle").remove();