// ==UserScript==
// @name "Wide" content for Google Plus.
// @description Replaces the new "whitespace' column with wider content.
// @match https://plus.google.com/*
// ==/UserScript==

// This is the right-hand trending, garbage, and whitespace column.
// Normally 256px.
GM_addStyle('.ksa {display: none !important;}');

//bounding box for left content
GM_addStyle('.OT { width: 100%  !important; }');

//share box
GM_addStyle('.xj { width: 756px  !important; }');
GM_addStyle('.g-Ac { width: 756px  !important; }');


//posts
GM_addStyle('.Gb { width: 756px  !important; }');
