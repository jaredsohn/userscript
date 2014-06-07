// MALrevCleaner
// version 0.5
// Copyright (c) 2009, DeathfireD built off of Mike Cao's original script
//
// --------------------------------------------------------------------
// Usage:
// MALrevCleaner will remove just the reviews displayed on the main
// anime and manga pages. You can still view reviews by going to the
// review page.
//
// V0.5 - MAL layout changes so updated css class in script.
// V0.4 - added code to remove the new MAL panel ad div image to inclease panel space.
// V0.3 - Fixed bug that would cause stat graphs to not load.
// V0.2 - New Mal urls so I fixed the cleaner to include them.
// V0.1 - released cleaner
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           MALrevCleaner V0.5
// @description    Removes My Anime List's Reviews.
// @include        http://myanimelist.net/panel.php
// @include        http://myanimelist.net/manga.php?id=*
// @include        http://myanimelist.net/anime/*
// @include        http://myanimelist.net/anime.php?id=*
// @include        http://myanimelist.net/manga/*
// @exclude        http://myanimelist.net/anime.php?id=*&display=reviews
// @exclude        http://myanimelist.net/anime/*/reviews
// @exclude        http://myanimelist.net/anime/*/stats
// @exclude        http://myanimelist.net/manga.php?id=*&display=reviews
// @exclude        http://myanimelist.net/manga/*/reviews
// @exclude        http://myanimelist.net/manga/*/stats
// @namespace      http://www.myanimelist.com/
// ==/UserScript==

var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Clean Reviews away
addStyle(".borderDark { display: none; }");
addStyle(".spaceit_pad div { display: none; }");
addStyle(".ad_728x90_center { display: none; }");
addStyle(".ad_300x250_center { display: none; }");

// Writes CSS to the document
writeStyle(css);
