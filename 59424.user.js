// ==UserScript==
// @name           Color Advance
// @namespace      My Prizee
// @include        http://www.prizee.com/forum/index.php?/topic/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$("#fast_reply > .generic_bar").html("<iframe src='http://www.chaudron-empoisonne.fr/prizee_color.php' height='100%' width='100%' frameborder='0'></iframe>");
$("#fast_reply > .generic_bar").css("height",125);
$("#fast_reply > .maintitle").append("<div style='float:right;cursor:pointer;' onclick=\"jQuery('.generic_bar').slideToggle('slow');\">Couleur advance</div>");

