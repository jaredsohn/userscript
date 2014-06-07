// ==UserScript==
// @name          MAL Highlighter
// @namespace     http://userscripts.org/scripts/show/85351
// @description   Highlight anime and manga list rows on mouse hover (Blue Tint with White BG)
// @include       http://myanimelist.net/animelist/*
// @include       http://myanimelist.net/mangalist/*
// ==/UserScript==

function addStyle() {
    GM_addStyle('tr:hover .td1 { background-color: #F7F7FF; }');
    GM_addStyle('tr:hover .td2 { background-color: #E8E8F1; }');
}

addStyle();
