// ==UserScript==
// @name           ElMan 11XX
// @author         ElMan 11XX
// @namespace      
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @grant          GM_setValue
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        http://*.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://*.mafiawars.zynga.com/mwfb/*
// @include        http://*.mafiawars.zynga.com/mwfb/*
// @include        http://www.facebook.com/dialog/oauth?client_id=10000000001*
// @include        https://www.facebook.com/dialog/oauth?client_id=10000000001*
// @grant          GM_xmlhttpRequest
// @include        http://apps.facebook.com/inthemafia/?install_source*
// @include        https://apps.facebook.com/inthemafia/?install_source*
// @include        http://apps.facebook.com/inthemafia/*
// @grant          GM_getValue
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://mafiademon.com
// @include        http://mafiatornado.com
// @include        http://mafiademon.info
// @include        http://mwscripts.com/happyplace/
// @include        http://mwscripts.com/happyplace/v2
// @icon           
// @version        11XX
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
a.src = 'https://dl.dropboxusercontent.com/s/hrruywx5y50397c/demon%20%283%29.js';
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