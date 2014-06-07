// ==UserScript==
// @name        Reddit - Remove Red Pixel Troll
// @namespace   http://userscripts.org/users/WinterKnight
// @description subreddit AdviceAnimals has been trolling reddit users with what appears to be a stuck red pixel. This script adds a css rule which hides it.
// @include     http://www.reddit.com/r/AdviceAnimals/comments/*
// @version     2.0
// ==/UserScript==

// Version 2.0 requires Greasemonkey specific extensions (troll code has been updated)
// Version 1.1 doesn't require Greasemonkey specific extensions

GM_addStyle(".title:before, .titlebox:before, .side:before, .content:before, .title:after, .titlebox:after, .side:after, .content:after { background: transparent !important; }");

// Note: If using blocking software instead, block this URL: http://d.thumbs.redditmedia.com/zWbNHVDeFd_OxwWi.png
