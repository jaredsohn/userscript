// ==UserScript==
// @name           Noindex Alerter
// @namespace      http://userscripts.org/users/23652
// @description    Alerts you when 'noindex' is found in a meta tag
// @include        http://*
// @include        https://*
// @include        file://*
// @copyright      JoeSimmons
// ==/UserScript==

var meta = document.getElementsByTagName('meta');

for(var i=meta.length-1; i>=0; i--) {
if(meta[i].getAttribute('content').toLowerCase().indexOf('noindex')!=-1 && meta[i].getAttribute('name').toLowerCase()=='robots') alert('This page has the \'noindex\' parameter in the meta tag');
}