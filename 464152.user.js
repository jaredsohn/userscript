// ==UserScript==
// @name        Wappalyzer
// @namespace   https://wappalyzer.com
// @include     *
// @version     1
// @grant       unsafeWindow
// ==/UserScript==
(function() { var d = document, e = d.getElementById('wappalyzer-container') ; if ( e !== null ) { d.body.removeChild(e); } var u = 'https://wappalyzer.com/bookmarklet/', t = new Date().getTime(), c = d.createElement('div'), p = d.createElement('div'), l = d.createElement('link'), s = d.createElement('script') ; c.setAttribute('id', 'wappalyzer-container'); l.setAttribute('rel', 'stylesheet'); l.setAttribute('href', u + 'css/wappalyzer.css'); d.head.appendChild(l); p.setAttribute('id', 'wappalyzer-pending'); p.setAttribute('style', 'background-image: url(' + u + 'images/pending.gif) !important'); c.appendChild(p); s.setAttribute('src', u + 'js/wappalyzer.js?' + t); s.onload = function() { s = d.createElement('script'); s.setAttribute('src', u + 'js/apps.js?' + t); s.onload = function() { s = d.createElement('script'); s.setAttribute('src', u + 'js/driver.js?' + t); c.appendChild(s); }; c.appendChild(s); }; c.appendChild(s); d.body.appendChild(c); })();
