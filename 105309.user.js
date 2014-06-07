// ==UserScript==
// @name           Redmine
// @namespace      http://www.redmine.org/
// @description    Redmine colour annotation
// @include        http://www.redmine.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

jQuery("#history p> strong").css("color", "#ff6d6d");
jQuery("#history del").css("color", "#c2fba3")
jQuery("#history em").css("color", "#e9a3fb")