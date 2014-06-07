// ==UserScript==
// @name        9gag popular posts blocker
// @namespace   dabrorius.9gag
// @description Removes Popular Posts from 9gag sidebar so that you don't spend hours watching crappy posts that are not even funny.
// @include     http://9gag.com/*
// @version     v1.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
$('#post-gag-stay').remove();