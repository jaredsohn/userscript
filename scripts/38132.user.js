// ==UserScript==
// @name          XTube - Remove Nag Screens
// @description   Skips the 'please sign up' nag screen when viewing videos by either changing play_re.php to watch.php directly, or automatically redirecting you away from the nag page if you happen to land on it.
// @author        Signe - http://www.cothlamadh.net/
// @namespace     http://www.cothlamadh.net/greasemonkey
// @include       http://*.xtube.com/*
// @version       1.0.20100721
// ==/UserScript==

var matchPlayLink = /\/play_re\.php\?v=/ig
document.body.innerHTML = document.body.innerHTML.replace(matchPlayLink, '/watch.php?v=');

var matchNagWin = /http:\/\/.*\.xtube\.com\/login_user_cont\.php\?url=/ig
if (matchNagWin.test(window.location.toString())) {
    window.location.replace(window.location.toString().replace(matchNagWin, ''));
}