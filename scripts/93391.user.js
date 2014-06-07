// ==UserScript==
// @name           Pinboard Private/Public Swapper
// @description    Swaps around the gray box that surrounds private bookmarks
// @lastupdated    2012-10-20
// @namespace      DgSzJqMKgn
// @version        1.3
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 11.0
// @include        http://pinboard.in/*
// @include        https://pinboard.in/*
// @include        http://www.pinboard.in/*
// @include        https://www.pinboard.in/*
// ==/UserScript==

/*
Swaps around the gray box that surrounds private bookmarks. Especially helpful
if you have "add bookmarks as private by default" enabled and only want
bookmarks that are public to stand out when viewing your profile.

Version 1.3 2012-10-20
 - Now works when searching

Version 1.2 2012-03-23
 - Lots of minor CSS changes on Pinboard's end, set .private's border-style to none.

Version 1.1 2010-12-23
 - Discovers username and properly disables itself when outside of user profile

Version 1.0 2010-12-22
 - Initial release
*/


// Borrowed from http://diveintogreasemonkey.org/ - Thanks Mark
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Find username when logged in
var allLinks = document.getElementsByTagName('a');
for (var i in allLinks) {
    if (allLinks[i].className == "banner_username") {
        var username = allLinks[i].href;
    }
}

username = username.replace("http://www.pinboard.in/", "");
username = username.replace("https://www.pinboard.in/", "");
username = username.replace("http://pinboard.in/", "");
username = username.replace("https://pinboard.in/", "");

if (RegExp(username).test(window.location.href) || window.location.href.indexOf("mine=Search+Mine") != -1) {
    addGlobalStyle('.bookmark {background:#eee}');
    addGlobalStyle('.private {background:#fff;border-style:none}');
}
