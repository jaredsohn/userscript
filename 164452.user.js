// ==UserScript==
// @id thumbs
// @name        Transparent Thumbnails
// @namespace   None
// @version 0.2
// @author Time & Gendalph
// @description Add transparent thumbnails
// @include http://boards.4chan.org/*
// @include https://boards.4chan.org/*
// @run-at document-end
// ==/UserScript==

GM_addStyle("a.fileThumb {opacity: 0.1; transition: 0.5s ease-in-out;}");
GM_addStyle("a.fileThumb:hover {opacity: 1.0; transition: 0.5s ease-in-out;}");