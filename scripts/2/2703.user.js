// Neowin.net - Link Swapper 1.2
// Copyright (c) 2006 Todd James
//
// This work is licensed under a Creative Commons License
// See http://creativecommons.org/licenses/by-nc-sa/2.5/
//
// ==UserScript==
// @name           Neowin.net - Link Swapper
// @namespace      http://userscripts.org/people/3628
// @description    Swaps the "Blogs" and "Forum" links on Neowin's forums.
// @include        http://www.neowin.net/forum/*
// @include        http://neowin.net/forum/*
// ==/UserScript==

(function() {
    var forumLink = document.getElementById('fclink');
    var blogsLink = document.getElementById('bclink');

    forumLink.parentNode.insertBefore(forumLink, blogsLink);
    forumLink.parentNode.insertBefore(blogsLink.nextSibling, blogsLink);
    unsafeWindow.swap2('fc');
})();
