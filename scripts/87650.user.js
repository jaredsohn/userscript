// ==UserScript==
// @name             Journals Format=Light Redirector
// @namespace        http://tearex.nfshost.com/gm/
// @description      LJ, DW, IJ, JF, and DJ format=light redirector. 
// @longdescription  Append ?format=light or &format=light on all individual entry pages unless excluded. GM version of InsaneJournal Format=Light Redirector (http://www.pokitty.com/code/#lj)
// (c)copyright      Ree (http://ree.insanejournal.com/)
// @attribution      Ree (http://www.pokitty.com.nyud.net/code/files/ij-format-light-redirect.js)
// @contributor      Nox (http://userscripts.org/users/Nox)
//
// @include        http://*.insanejournal.com/*.html
// @include        http://*.livejournal.com/*.html
// @include        http://*.deadjournal.com/*.html
// @include        http://*.journalfen.net/*.html
// @include        http://*.dreamwidth.org/*.html
//
// @exclude       http://www.insanejournal.com/*
// @exclude       http://*.insanejournal.com/*.html?*
// @exclude       http://*.insanejournal.com/*.html*format=light
// @exclude       http://*.insanejournal.com/*.html*style=mine
// @exclude       http://*.insanejournal.com/*.html*mode=reply
//
// @exclude       http://www.livejournal.com/*
// @exclude       http://*.livejournal.com/*.html?*
// @exclude       http://*.livejournal.com/*.html*format=light
// @exclude       http://*.livejournal.com/*.html*style=mine
// @exclude       http://*.livejournal.com/*.html*mode=reply
//
// @exclude       http://www.deadjournal.com/*
// @exclude       http://*.deadjournal.com/*.html?*
// @exclude       http://*.deadjournal.com/*.html*format=light
// @exclude       http://*.deadjournal.com/*.html*style=mine
// @exclude       http://*.deadjournal.com/*.html*mode=reply
//
// @exclude       http://www.journalfen.net/*
// @exclude       http://*.journalfen.net/*.html?*
// @exclude       http://*.journalfen.net/*.html*format=light
// @exclude       http://*.journalfen.net/*.html*style=mine
// @exclude       http://*.journalfen.net/*.html*mode=reply
//
// @exclude       http://www.dreamwidth.org/*
// @exclude       http://*.dreamwidth.org/*.html?*
// @exclude       http://*.dreamwidth.org/*.html*format=light
// @exclude       http://*.dreamwidth.org/*.html*style=mine
// @exclude       http://*.dreamwidth.org/*.html*style=light
// @exclude       http://*.dreamwidth.org/*.html*style=site
// @exclude       http://*.dreamwidth.org/*.html*mode=reply
// ==/UserScript==

(function() {
location.replace(location+=(location.search?'&':'?')+'format=light');
})();

