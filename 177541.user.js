// ==UserScript==
// @name         Kill
// @require       http://code.jquery.com/jquery-latest.min.js
// @include       http://*.storm8.com/*
// @version      1
// ==/UserScript==

setTimeout(function() { window.location.reload(); }, 1000); // 1 seconds, e.g.

$(document).ready(function() {
    $('a[href*="profile"]:contains("")')
 .closest('tr').find('.fightActionInnerInner').click();
});

$(document).ready(function() {
    $('a[href*="profile"]:contains("👿")')
 .closest('tr').find('.fightActionInnerInner').click();
});

$(document).ready(function() {
    $('a[href*="profile"]:contains("😈")')
 .closest('tr').find('.fightActionInnerInner').click();
});
