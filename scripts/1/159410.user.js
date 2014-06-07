// ==UserScript==
// @name        General Discussion Organizer
// @namespace   fpgdorganize
// @include     http://facepunch.com/forumdisplay.php?f=6
// @include		http://facepunch.com/forums/6
// @version     1
// @grant		none
// ==/UserScript==

var url = window.location.href;
var fpPattern = /^http:\/\/facepunch.com\/.*/;
// Edit: To prevent multiple redirects:
var compactPattern = /\&sort=lastpost&order=desc/;
if (fpPattern.test(url)
    && !compactPattern.test(url)) {
    window.location.href = 'http://facepunch.com/forumdisplay.php?f=6&sort=lastpost&order=desc';
}