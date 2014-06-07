// ==UserScript==
// @name        Flickr - Download Current Image
// @description This tiny script wraps an image in Flickr with an <a> tag to the image's source.
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require     http://code.chimericdream.com/GmScripts/GM-AutoUpdate.php?id=113806
// @namespace   http://userscripts.org/users/85815
// @include     https://*.flickr.com/photos/*
// @include     http://*.flickr.com/photos/*
// @include     https://flickr.com/photos/*
// @include     http://flickr.com/photos/*
// @grant       none
// ==/UserScript==

$("#allsizes-photo .spaceball").hide();
var image = $("#allsizes-photo img");

image.wrap('<a href="' + image.attr('src') + '" title="Download image"></a>');