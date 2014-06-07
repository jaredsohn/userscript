// ==UserScript==
// @name        reddit domain highlight
// @namespace   http://reddit.com
// @author      sodypop
// @include     http://www.reddit.com/r/*/about/*
// @include     http://reddit.com/r/*/about/*
// @version     1.0
// ==/UserScript==

highlight = "a[href*=\".amazon.\"][href*=\"%2D20\"], a[href*=\".amazon.\"][href*=\"%2D21\"]," + 
         "a[href*=\".amazon.\"][href*=\"-20\"], a[href*=\".amazon.\"][href*=\"-21\"]" +
		 "{ color: yellow !important\; }" +
		 "a[href*=\".fbcdn.\"], a[href*=\".facebook.\"]" +
		 "{ color: red !important\; }" +
		 "a[href*=\".tumblr.\"]" +
		 "{ color: green !important\; }";

GM_addStyle(highlight);