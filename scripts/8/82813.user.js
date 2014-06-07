// ==UserScript==
// @name           Reddit - Ignore users
// @namespace      http://userscripts.org/users/115800
// @description    Collapses comments from ignored users.
// @icon           http://i.imgur.com/78pKh.png
// @include        http://*.reddit.com/*comments/*
// ==/UserScript==

GM_registerMenuCommand("Ignored users...", editUsers);

function editUsers() {
    var users = window.prompt("Usernames are case-sensitive and must be delimited by commas. Spaces are optional.\n\nIgnored users:", GM_getValue("users", "example1,example2"));
    GM_setValue("users", users);
}

$ = unsafeWindow.jQuery;
if ($) {
    var users = GM_getValue("users", "");
    if (users) {
        users = users.replace(/\s/g, "").split(",");
        for (var i in users) {
            $(".author[href$=" + users[i] + "]").after(" (Ignored)");
            $(".noncollapsed > p > a[href$=" + users[i] + "]").prev().click();
        }
        if ($(".commentarea > .infobar").length) {
            $(".comment:has(.border) > .entry > .collapsed > .expand").click();
        }
    }
}
