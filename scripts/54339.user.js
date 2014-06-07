// ==UserScript==
// @name           redirectLLtoETI
// @namespace      bane427
// @description    redirects from luelinks.net to endoftheinter.net
// @include        http://luelinks.net/*
// @include        http://*.luelinks.net/*
// @include        https://luelinks.net/*
// @include        https://*.luelinks.net/*
// ==/UserScript==

document.location.href = document.location.href.replace('luelinks', 'endoftheinter');