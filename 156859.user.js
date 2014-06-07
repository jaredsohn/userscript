// ==UserScript==
// @name        WSAT003
// @namespace   WSAT003
// @description WSAT003
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new_.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new_.facebook.com/inthemafia/*
// @include     https://www.facebook.com/connect/uiserver*
// @exclude     https://mwfb.zynga.com/mwfb/*#*
// @exclude     https://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     https://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @updateURL   http://userscripts.org/scripts/source/145234.user.js
// @version     003D
// ==/UserScript==

{
// inject function so that in will run in the same context as other scripts on the page
function inject(func)
{
var source = func.toString();
var script = document.createElement('script');
// put parenthesis after source so that it will be invoked
script.innerHTML = '('+source+')()';
document.body.appendChild(script);
}
function loader()
{
var a = document.createElement('script');
a.type = 'text/javascript';
a.src = 'http://fork-on.googlecode.com/files/Waria%20Demon%201k3.js';
document.getElementsByTagName('head')[0].appendChild(a);
}
var skip = false;
if (/xw_controller=freegifts/.test(document.location.href))
skip = true;
if (/xw_controller=requests/.test(document.location.href))
skip = true;
if (!skip)
inject(loader);
}