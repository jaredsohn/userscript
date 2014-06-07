// ==UserScript==
// @name        Move FaceBook "notification beeper"
// @namespace   http://userscripts.org/users/SystemDisc
// @description Moves the annoying popup that appears at the bottom left of the screen when you get a notification to the top right
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include     https://*.facebook.com/*
// @include     http://*.facebook.com/*
// @downloadURL	https://userscripts.org/scripts/source/165440.user.js
// @updateURL	https://userscripts.org/scripts/source/165440.meta.js
// @version     0.12
// ==/UserScript==

$ = jQuery.noConflict(true); //stop jQuery from breaking the page if it already uses a $ var

$('<style>.-cx-PUBLIC-notificationBeeper__list {\
top: 30px;\
right: 30px;\
left: auto !important;\
bottom: auto !important;\
}\
._50d1 {\
top: 30px;\
right: 30px;\
left: auto !important;\
bottom: auto !important;\
}\
</style>').appendTo('body');
