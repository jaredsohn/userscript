// ==UserScript==
// @name        MpvPlay
// @namespace   nez
// @description Add an link (eject symbol) on youtube video pages opening the video in MPV (or similar).
// @include     /^https?://(?:www)?\.youtube\.com/
// @version     0.1
// @grant       GM_addStyle
// ==/UserScript==

// Add styling rules for the element.
GM_addStyle("#mpvlink { font-size: 50%; vertical-align: middle; } #mpvlink:hover { color: #77aadd; text-decoration: none; }");
// Create the link.
mpvlink = document.createElement("a");
mpvlink.id = "mpvlink";
mpvlink.href="mpv://"+document.location.href;
mpvlink.title = "Play the video in MPV."
mpvlink.text="⏏";
// Put it in the right place.
tit = document.getElementById("eow-title");
tit.parentElement.appendChild(mpvlink);
