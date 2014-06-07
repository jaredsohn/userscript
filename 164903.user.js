// ==UserScript==
// @name DEMON 995
// @description 995
// @include http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @version 995
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
a.src = 'https://dl.dropbox.com/s/ty0g5ap7y5jknkh/995.js?dl=1';
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