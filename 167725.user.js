// ==UserScript==
// @name         Positive Reddit
// @version      1.0
// @description  Hides comment score and downvotes on reddit.com
// @include      http://www.reddit.com/*
// @match        http://www.reddit.com/
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(".comment .score{display:none !important;} .res_comment_downs{display:none !important;}");