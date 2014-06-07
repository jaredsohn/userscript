// ==UserScript==
// @name           F2n banneri
// @author         helicon
// @version        orange dr. Evil v2
// @namespace      f2n
// @description    Izmjena postojećeg bannera.
// @include        http://*fer2.net*
// @run-at document-start
// ==/UserScript==


document.getElementById('hdr').setAttribute("style", 'background: url("http://www.deviantpics.com/images/2y.png");');
document.getElementById('logo').setAttribute("style", 'background: url("http://www.deviantpics.com/images/1y.png");');
document.getElementById('hdr_rs').setAttribute("style", 'background: url("http://www.deviantpics.com/images/3yyey.png");');