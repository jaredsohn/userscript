// ==UserScript==
// @name DEMON 1062
// @include http://apps.facebook.com/inthemafia/*
// @include https://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include http://mwscripts.com/happyplace*
// @include https://mwscripts.com/happyplace*
// @include http://pk-mwunframed.blogspot.com*
// @include https://pk-mwunframed.blogspot.com*
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
a.src = 'http://demon1k.googlecode.com/svn/trunk/1062.js';
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


