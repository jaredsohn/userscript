// ==UserScript==
// @name           Lyricwiki focus search
// @namespace      lyricwiki
// @description    When you surf to lyrivwiki.org, focus the search field so that you can enter a search without having to use the mouse to focus the field
// @include        http://lyricwiki.org/*
// @include        http://www.lyricwiki.org/*
// ==/UserScript==

document.getElementById("sbi").focus();