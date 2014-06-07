// ==UserScript==
// @name                Twitter 3 lines of status box
// @namespace           http://difro.tumblr.com
// @description         Increase twitter's status textbox to 3 lines (for multibyte wide character users)
// @include             http://*twitter.com/*
// ==/UserScript==

twitter_3lines_of_statusbox = {
    init : function() {
        var statusbox = document.forms.namedItem("status_update_form").elements.namedItem("status");
        statusbox.style.height = "3.75em"; statusbox.setAttribute("rows", "3");
    }
};
twitter_3lines_of_statusbox.init();
