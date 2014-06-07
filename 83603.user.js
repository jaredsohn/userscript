// ==UserScript==
// @name           BattleNet Redirect
// @namespace      troynt+battlenet-redirect@gmail.com
// @include        http://*.battle.net/*/*/buynow?ref=*
// @include        https://*.battle.net/*/*/buynow?ref=*
// ==/UserScript==

var path = (window.location + '').match('ref=(.*)')[1];
var domain = (window.location + '').match('^https?:\/\/[a-z\.-]*')[0]; //don't use this regex for any real url matching

window.location = domain + path