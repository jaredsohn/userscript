// ==UserScript==
// @name           /r/wow/ MMOC DB Tooltips
// @namespace      http://about:blank
// @description    Add MMO-Champion DB tooltips to /r/wow/
// @include        http://www.reddit.com/r/wow/*
// ==/UserScript==
document.body.appendChild(document.createElement('script')).src='http://db.mmo-champion.com/tt.js'; (function retry() { if (typeof ttlib != 'undefined') ttlib.init(); else setTimeout(retry, 10); })(); void 0;