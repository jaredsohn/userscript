// ==UserScript==
// @name           Newgrounds: 4Chan BBS.
// @author      jcgurango
// @description    Instead of saying "NG BBS" in the title, it will say "4Chan BBS".
// @include         *newgrounds.com/bbs/*
// ==/UserScript==

var topic = document.title.substr(6);
document.title = "4Chan BBS" + topic;