// ==UserScript==
// @name        Galcon Subforum Hider
// @namespace   http://userscripts.org/scripts/show/155440
// @description hides shit that bothers you...
// @include     http://www.galcon.com/forums/
// @grant       none
// @require     http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var subforums_to_hide = [25]; // add shit that bothers you HERE (e.g. [25,31]; ...)
for (var i = 0, subforum; subforum = subforums_to_hide[i]; i++) {
    $("a[href='" + subforum + "/']").parent().parent().css("display", "none");
}