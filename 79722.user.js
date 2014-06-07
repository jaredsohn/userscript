// ==UserScript==
// @name           Craiglook + Google Maps
// @namespace      nocturnal.org
// @description    Add Google Map link to list items
// @include        http://craiglook.com/*.html*
// @include        http://craiglook.com/*/*.html*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('.item').each(function () {
    var loc = $(this).find('.location > a').text();
    $(this).find('.buttons').append(
        '<a href="http://maps.google.com?q=' + loc +'&z=7" target="_new">Map</a>'
    );
});
