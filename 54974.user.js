// ==UserScript==
// @name            MyAnimeList.net: All Friends Link
// @namespace       http://myanimelist.net/profile/N_Ox
// @description	    Change the My Friends link to point to the All Friends page
// @include         http://myanimelist.net/*
// ==/UserScript==

(function() { if (typeof jQuery == 'undefined') $ = unsafeWindow.$;

var link = $('a[href$=myfriends.php]');
if (!link) return;
link.attr('href', link.attr('href') + '?o=2');

})();
