// ==UserScript==
// @name          inline_blocker
// @namespace     http://zzo38computer.cjb.net/userjs/
// ==/UserScript==

// Blocks inline popups, "unblockable" ones that appear in the same window and
// that scroll with the page, but obviously they aren't really unblockable if
// this script will block them.

// Latest version is available at:
//  http://zzo38computer.cjb.net/userjs/inline_blocker.user.js

fake_scroll_getter=function() {
 return -31337;
}

unsafeWindow.document.documentElement.__defineGetter__("scrollTop",fake_scroll_getter);
unsafeWindow.document.documentElement.__defineGetter__("scrollHeight",fake_scroll_getter);
unsafeWindow.document.body.__defineGetter__("scrollTop",fake_scroll_getter);
unsafeWindow.document.body.__defineGetter__("scrollHeight",fake_scroll_getter);
unsafeWindow.__defineGetter__("pageYOffset",fake_scroll_getter);
unsafeWindow.__defineGetter__("scrollY",fake_scroll_getter);
unsafeWindow.document.onscroll=null;
unsafeWindow.onscroll=null;
