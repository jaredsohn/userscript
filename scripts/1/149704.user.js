// ==UserScript==
// @name           NoviMagazin scroll killer
// @description    Removes annoying scroller from novimagazin.rs
// @author         jablan
// @include        http://*.novimagazin.rs
// @version        1.0
// ==/UserScript==

$(function() {
$('#header-scroll').remove();
});