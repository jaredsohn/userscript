// ==UserScript==
// @name           twitter who are you
// @namespace      yaotti.com
// @version        0.0.1
// @include        http://twitter.com/*
// @description    display your current twitter account you're logging in as
// ==/UserScript==
(function() {
    var id = document.querySelector('head > meta[name="session-user-screen_name"]').content;
    var atag = '<a href="/home" style="color:black;font-weight:bold;font-size:1.1em;">' + id + '</a>';
    document.querySelector('#home_link').innerHTML = atag;
})();










