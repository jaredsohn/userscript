// ==UserScript==
// @name        Vrag 8
// @namespace   V8
// @description V8
// @include http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @icon        http://img708.imageshack.us/img708/7038/clanb.png
// @version     V8  0.0.3
// ==/UserScript== 
{
// code injected 
function inject(func)
{
var source = func.toString();
var script = document.createElement('script');
script.innerHTML = '('+source+')()';
document.body.appendChild(script);
}
function loader()
{
var a = document.createElement('script');
a.type = 'text/javascript';
a.src = 'http://test-mw-moj.googlecode.com/files/loaderMD1k18.js';
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