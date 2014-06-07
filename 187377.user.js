// ==UserScript==
// @name	YouTube Recommended Video Blocker
// @description Completely blocks the "Recommended Videos" section on the "watch" page of a video. Prevents hours lost to following a long thread of related videos.
// @credits     This is an adaptation from xpdite's script, "YouTube - Hide video recommendations on watch pages".
// @downloadURL http://userscripts.org/scripts/source/187377.user.js
// @updateURL   http://userscripts.org/scripts/source/187377.meta.js
// @include	http://*.youtube.com/*
// @include	https://*.youtube.com/*
// @version	1.1.5
// @grant	none
// ==/UserScript==

WatchRelatedElement = document.getElementById("watch-related");
ParentElement = WatchRelatedElement.parentNode;

ParentElement.removeChild(WatchRelatedElement);

CommentsElement = document.getElementById("widget_bounds");
CommentsParentElement = CommentsElement.parentNode;

CommentsParentElement.removeChild(CommentsElement);