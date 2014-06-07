// ==UserScript==
// @name           Google Redirect to Login
// @namespace      cavingdeep
// @description    When visiting a Google page, automatically redirects to the login page if user is still not logged in.
// @include        http://*.google.*/*
// ==/UserScript==

function redirectToLogin() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href").match(/^https:/)) {
            setTimeout(function() {
                window.location = links[i].getAttribute("href");
            }, 100);
            break;
        }
    }
}

var loggedIn = document.cookie.match(/(^|;)\s*SID=/g);
if (!loggedIn) {
    redirectToLogin();
}
