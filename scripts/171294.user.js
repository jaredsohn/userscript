// ==UserScript==
// @name          Kill WD New
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

setTimeout(function() { window.location.reload(); }, 1000); // 1 seconds, e.g.

$(document).ready(function() {
    $('a[href*="profile"]:contains("😈")')
 .closest('tr').find('.fightActionInnerInner').click();
});
