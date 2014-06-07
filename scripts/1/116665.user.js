// ==UserScript==
// @name           Zoom's redirect
// @namespace      Mafia Wars
// @description    Redirects from Facebook to Zynga
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// ==/UserScript==

var newurl = window.location.href.replace(/^https?:\/\/apps.facebook.com\/inthemafia/, 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=index&xw_action=view&xw_city=&tmp');
newurl = newurl.replace(/#!\/(.*)/, '$1');
window.location.href = newurl;
