// ==UserScript==
// @name           Hide Google Reader Unread Count from Title Bar
// @namespace      http://userscripts.org/scripts/show/38169
// @description    Replaces (#) in both the main title bar and the tab title with (Unread Count Hidden)
// @include        http://www.google.com/reader/*
// ==/UserScript==

document.title = 'Google Reader (Unread Count Hidden)                                                                                                                                                                                                                                                                                                                                                                                   ' // Just a very long string of space characters to push the actual unread count outside the viewing area
