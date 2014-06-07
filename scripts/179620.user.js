// ==UserScript==
// @name        Auto Reload Mafia Wars
// @namespace   auto15
// @description AutoReload
// @include        http://facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php*

// @include        https://facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php*

// @include        http://www.facebook.com/dialog/oauth?client_id=10000000001*

// @include        https://www.facebook.com/dialog/oauth?client_id=10000000001*

// @include        http://apps.facebook.com/inthemafia/?install_source*

// @include        https://apps.facebook.com/inthemafia/?install_source*

// @include        http://apps.facebook.com/inthemafia/*

// @include        https://apps.facebook.com/inthemafia/*

// @include        http://mafiademon.com

// @include        http://mafiatornado.com

// @include        http://mafiademon.info

// @include        http://mwscripts.com/happyplace

// @include        http://mwscripts.com/happyplace/v2
// @grant       GM_xmlhttpRequest
// @version     0.1
// ==/UserScript==

// Yazid Yahya
// based on code by Julien Couvreur
// and included here with his gracious permission

var numMinutes = 15;
window.setTimeout("window.open('https://apps.facebook.com/inthemafia','_blank'); window.open('','_self').close();", numMinutes*15*1000);