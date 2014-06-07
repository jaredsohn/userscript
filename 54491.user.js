// ==UserScript==
// @name           Cooks Illustrated - Recipes
// @namespace      http://bitkickers.blogspot.com/
// @description    Gets ride of header and footer on recipe print view.
// @include        http*://www.cooksillustrated.com/recipes/print*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

$("#cooksIllustratedMasthead").hide();
$(".pageSectionTop").css("border-top", "none").css("padding-top", "0px");
$(".footerText").hide();
$("#contentFooter").hide();
$(".pageSection:contains('Step-by-Step')").hide();
