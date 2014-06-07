// ==UserScript==
// @name        Gathering of Tweakers Ctrl+Enter Submit
// @namespace   https://userscripts.org/users/526586
// @include     https://gathering.tweakers.net/*
// @include     http://gathering.tweakers.net/*
// @version     1.0
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

var myjQuery = this.jQuery = jQuery.noConflict(true);

myjQuery('textarea#messageBox').keydown(function(e) {
    if (e.ctrlKey && e.keyCode == 13) {
        myjQuery(e.currentTarget).closest('form').submit();
    }
});