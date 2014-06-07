// ==UserScript==
// @name       iTunes HD Covers
// @namespace  itunes-hd-covers
// @version    0.1
// @description  Click on the release cover on iTunes to get the 1200x1200 picture.
// @match      https://itunes.apple.com/*
// @match      http://itunes.apple.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2012+, Kazaam
// ==/UserScript==

// Qu'est-ce que tu cherches ici ? Y a rien à voir, mon code est parfait, toujours.

var coverURL = $('div#left-stack div.artwork img').attr('src');
$('div#left-stack div.artwork img').closest('a').attr('href', coverURL.replace("170x170", "1200x1200"));
