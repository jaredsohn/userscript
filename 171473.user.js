// ==UserScript==
// @name        Marktplaats Opschoner
// @namespace   CookieFoetsie
// @include     http://www.marktplaats.*/*
// @grant       none
// @version     1.7
// @description Cleans up marktplaats.nl (Topadvertenties, Adsense, Admarkt, cookie notice)
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

// remove cookie notice footer (black bar at bottom)
var CookieFoetsie = document.getElementById('layover-target');
CookieFoetsie.parentElement.removeChild(CookieFoetsie);

// Remove 'Topadvertenties' (by pettenstein)
$("span.mp-listing-priority-product:contains('Topadvertentie')").parent().parent().remove();
$("td.inline-listings-banner").parent().remove();

// Remove bottom listings (by pettenstein)
$("#bottom-listings-divider").remove();
$("tr.bottom-listing").remove();

// Remove Admarkt zut
$("div.mp-adsense-header-top").remove();
$("#superCasContainerTop.adsense-csa").remove();

// Remove ads with "gezocht"
$("span.mp-listing-title.wrapped:contains('Gezocht')").parent().parent().parent().parent().parent().remove();

// Remove ads with "Heel Nederland"
$("div.location-name:contains('Heel Nederland')").parent().parent().parent().remove();

// Remove ads with thumbs-up icon
$("span.icon-thumb-up").parent().parent().parent().remove();

// Remove "Ook van deze adverteerder" junk
$("TR.search-result.horizontalRichSnippet.group-0").remove();
$("TR.horizontal-extended-listing.group-0").remove();
$("TR.search-result.horizontalRichSnippet.group-1").remove();
$("TR.horizontal-extended-listing.group-1").remove();

// Remove useless "Anderen Bekeken"
var SimilarFoetsie = document.getElementById('vip-right-cas-listings');
SimilarFoetsie.parentElement.removeChild(SimilarFoetsie);