//"use_hitbox=d5c5516c3379125f43aa0d495d100d6ddAEAAAAw; VISITOR_INFO1_LIVE=Tiz58ZEjkKk; PREF=f2=40000000";
// ==UserScript==
// @name          YouTube HTML5
// @namespace     http://userscripts.org/users/413819
// @description   Always use HTML5 youtube option
// @include       http://www.youtube.com/*
// ==/UserScript==

if (!document.cookie.match('PREF=f2=40000000')){
    document.cookie = 'PREF=f2=40000000';
    if (window.location.href.match('watch'))
        window.location.reload();
}