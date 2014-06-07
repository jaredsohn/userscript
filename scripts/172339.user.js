// ==UserScript==
// @name        JVCaptchat
// @description Grossi le captchat.
// @include     http://www.jeuxvideo.com/*
// @include     http://*.forumjv.com/*
// @run-at      document-end
// @version     1.1
// ==/UserScript==
document.getElementsByClassName('confirm')[0].getElementsByTagName('img')[0].width = 125;
document.getElementsByClassName('confirm')[0].getElementsByTagName('img')[0].height = 35;