// ==UserScript==

// @name          Codeforces spam remover
// @namespace     tag:codeforces
// @description   Hides spam messages at Codeforces.

// @include       http://codeforces.ru/*
// @include       https://codeforces.ru/*
// @include       http://*.codeforces.ru/*
// @include       https://*.codeforces.ru/*
// @include       http://codeforces.com/*
// @include       https://codeforces.com/*
// @include       http://*.codeforces.com/*
// @include       https://*.codeforces.com/*

// @version       1.0.2
// ==/UserScript==

var THRESHOLD = 2;
var WHITELIST = ["MikeMirzayanov", "MaximShipko", "snarknews", "anup.kalbalia", "ruzana.miniakhmetova", "MDovzhenko", "kture", "k-va", "naik", "elena", "l1ghtside"];

var recent_actions = document.querySelector(".recent-actions");
var recent_posts = recent_actions.querySelectorAll(".user-black");

// count posts per unrated user
var postcount = {};
for (var i = 0; i < recent_posts.length; i++) {
    var handle = recent_posts[i].text;
    if (postcount[handle]) {
        postcount[handle] += 1;
    } else {
        postcount[handle] = 1;
    }
}

var bad_users = [];
for (var i = 0; i < recent_posts.length; i++) {
    var handle = recent_posts[i].text;
    if (postcount[handle] >= THRESHOLD && WHITELIST.indexOf(handle) == -1) {
        var remove_el = recent_posts[i].parentElement;
        remove_el.parentElement.removeChild(remove_el);
        if (bad_users.indexOf(handle) == -1) {
            bad_users.push(handle);
        }
    }
}

// also remove posts by bad users in main part of the page
var content = document.querySelector(".content-with-sidebar");
var content_posts = content.querySelectorAll(".avatar");

for (var j = 0; j < content_posts.length; j++) {
    var handle_item = content_posts[j].querySelector(".user-black");
    if (handle_item) {
        if (bad_users.indexOf(handle_item.text) >= 0) {
            var remove_el = content_posts[j].parentElement.parentElement.parentElement.parentElement;
            remove_el.parentElement.removeChild(remove_el);
        }
    }
}
