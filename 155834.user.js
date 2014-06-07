// ==UserScript==
// @name       YoutubeFix
// @namespace  http://bjarke.tobiesen.org/
// @version    1.0
// @description  changes the youtube logo link to the subscriptions page
// @include     http*://youtube.com*
// @include     http*://www.youtube.com*
// @copyright  2012+, Bjarke Tobiesen
// ==/UserScript==

var yt = document.getElementById('logo-container');
yt.href = 'http://www.youtube.com/feed/subscriptions/u';
