// ==UserScript==
// @name        netvibes - fix 2014 bad design choices (apps view)
// @namespace   mikecupcake
// @include     http*://*netvibes.com/privatepage/*
// @version     0.6
// @grant       GM_addStyle
// ==/UserScript==


// reader bodytext --------------
GM_addStyle(" .nv-ir-article-text { line-height: 130% !important; font-size: 110% !important; } ");
GM_addStyle(" .nv-ir-article-text p { margin-top: 1em !important; } ");
GM_addStyle(" .nv-ir-article-text br + br { display: inline !important; } ");
GM_addStyle(" .nv-ir-article-text blockquote { margin: 1em 0 1em 1em !important; } ");
// -----------------------

// reader headline ----------------
GM_addStyle(" div#feedReaderContentFrame div.nv-ir-feed-head h2.title { line-height: 110% !important; font-size: 1.8em !important; } ");
// hide headline in website view
GM_addStyle(" div#feedReaderContentFrame div.content-website div.nv-ir-feed-head h2.title { display: none !important; } ");
GM_addStyle(" div#feedReaderContentFrame div.content-website { padding: 0 !important; } ");
// hide icons above headline in website view
GM_addStyle(" div#feedReaderContentFrame div.content-website div.nv-ir-feed-head div.item-actions { display: none !important; } ");
GM_addStyle(" div#feedReaderContentFrame div.content-website div.nv-ir-feed-head { margin-top: 0 !important; } ");
// -----------------------------


// reader sidebar headlines ---------------
// remove gradient fade over text
GM_addStyle(" #feedReader .headlines .headline-link:after { background-image: none !important; } ");
// show ENTIRE HEADLINE (!)
GM_addStyle(" #feedReader .headlines .headline-link { white-space: normal !important; padding: 0.5em 1em !important; font-size: 80% !important; } ");
GM_addStyle(" #feedReader .headlines .headline { padding-right: .4em !important; } ");
// -----------------------------------


// apps panes -------------------
// set mouseovered unread headlines to black
GM_addStyle("div div.rss-display ul.nv-feedList li.unread a:hover { color: #000000 !important; } ");
// -----------------------------

// netvibes have fixed:
// GM_addStyle(" .nv-item-renderer { padding: 0 !important; margin: 0 !important; } ");
// --------------