// ==UserScript==
// @name           chanarchive board filter
// @description    Board filter for chanarchive.
// @include        http://chanarchive.org/*
// @include        http://*.chanarchive.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==


$('a[href$="/b"], a[href$="/mlp"]').parents('div.ca_ctl_row').css('display', 'none');