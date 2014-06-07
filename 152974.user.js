// ==UserScript==
// @name       Do Not Want Stuff Nation on stuff.co.nz
// @namespace  http://dcscripts/
// @version    0.7
// @description  Hide Stuff Nation content on www.stuff.co.nz
// @include    http://www.stuff.co.nz/*
// @copyright  me
// @grant  unsafeWindow
// ==/UserScript==
// Version History:
// v0.7 catch still more assignment links
if (location.href.indexOf("stuff-nation") < 0) {
    // hide entire home-page stuff nation box
    unsafeWindow.jQuery(".hbox_top_title a[href*='stuff-nation']").closest(".hbox_sortable, .hbox_wide").hide();

    // hide Stuff nation link containers all over the page
    unsafeWindow.jQuery("a[href*='stuff-nation']").not("a[href*='settings'],a[href*='saved-stories'],a[href*='profile']").parent().hide();
    
    // assignment submissions anywhere
    unsafeWindow.jQuery(".assignment-submission_icon").parent().hide();
    
    // Some "assignments" don't have stuff-nation links now?
    unsafeWindow.jQuery(".assignment-submission_icon_link, .assignment_icon_link").hide();
}