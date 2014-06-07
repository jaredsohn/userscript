// ==UserScript==
// @name           Skapiec - domyslne miasto
// @namespace      localhost
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.skapiec.pl/site/cat/*
// ==/UserScript==


var myCity = jQuery("#cityID option[name=warszawa]").clone(true).end().remove(); 
jQuery("#cityID").prepend(jQuery(myCity));
jQuery(".promo").remove();
