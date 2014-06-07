// ==UserScript==
// @name           Google Reader Title
// @namespace      http://userscripts.org/users/63891
// @description	Modifies the Google Reader title to show only the unread count.  Useful when you have lots of tabs open and can only see the first few characters of each title.
// @include        http://www.google.com/reader/*
// @include        http://google.com/reader/*
// ==/UserScript==

window.updateUnread = function() {
window.title_first_paren = document.title.indexOf('(') + 1;
window.title_last_paren = document.title.indexOf(')');
window.greader_unread_count = document.title.substring(title_first_paren,title_last_paren);
document.title = ' ' + greader_unread_count;
}

updateUnread();