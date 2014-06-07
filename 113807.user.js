// ==UserScript==
// @name           Flickr - Jump to All Sizes View
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @namespace      http://userscripts.org/users/85815
// @include        http://*.flickr.com/photos/*
// ==/UserScript==

var imgloc = $("#options-menu ul li a.option-all-sizes").attr('href') + "";

if (imgloc != '' && imgloc != 'undefined' && typeof imgloc != 'undefined') {
    window.location = 'http://www.flickr.com' + imgloc;
}