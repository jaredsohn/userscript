// ==UserScript==
// @name       Marktplaats AdBlock
// @namespace  
// @version    0.4
// @description  Remove the 'Top Advertenties' from the search results page
// @match      http://www.marktplaats.nl/*
// @include    http://www.marktplaats.nl/*
// @copyright  2013+, pettenstein
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

// Remove 'Top Advertenties'
$("span.mp-listing-priority-product:contains('Topadvertentie')").parent().parent().remove();
// Remove 'Dagtoppers'
$("span.mp-listing-priority-product:contains('Dagtopper')").parent().parent().remove();
$("td.column-rich-intro:contains('Ook van deze adverteerder')").parent().remove();
// Remove Online Stores
$("div.location-name:contains('Bezorgt in')").parent().parent().parent().remove();

$("td.inline-listings-banner").parent().remove();

$("tr.horizontalRichSnippet").addClass("defaultSnippet").removeClass("horizontalRichSnippet");

// Remove bottom listings
$("#bottom-listings-divider").remove();
$("tr.bottom-listing").remove();