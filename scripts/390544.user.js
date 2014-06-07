// ==UserScript==
// @name       Waterloo D2L LEARN full width
// @namespace  
// @version    0.1
// @description  Changes D2L LEARN page to use all of page width
// @match      https://learn.uwaterloo.ca/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2012+, sunapi386
// ==/UserScript==

// Modify .d2l-max-width in Waterloo LEARN Website to make full scale
// Wait for the page to be parsed
jQuery(".d2l-background-global").remove();
jQuery(".d2l-background-left").remove();
jQuery(".d2l-background-right").remove();
jQuery(".d2l-minibar").css("background-color", "#2B2B2B");
jQuery(".d2l-max-width").css("max-width", "100%");
jQuery(".d2l-navbar-container.d_nb_cMiddle").remove();
jQuery("body").css("padding-bottom", "80px");