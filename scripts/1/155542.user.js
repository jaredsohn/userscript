// ==UserScript==
// @name         Youtube fixed topbar
// @namespace    http://userscripts.wtlink.be
// @version      1.2
// @description  Fix the youtube topbar to top
// @include      https://www.youtube.com*
// @include      http://www.youtube.com*
// @exclude	 http://www.youtube.com/embed/*
// @exclude	 https://www.youtube.com/embed/*
// @updateURL	 http://userscripts.wtlink.be/scripts/youtube-fixed-topbar.user.js
// @copyright    2012+, bendem
// ==/UserScript==
document.getElementById('yt-masthead-container').style.position = 'fixed';
document.getElementById('yt-masthead-container').style.right = '0';
document.getElementById('yt-masthead-container').style.top = '0';
document.getElementById('yt-masthead-container').style.left = '0';
document.getElementById('yt-masthead-container').style.zIndex = '100';
document.getElementById('yt-masthead-container').style.boxShadow = '0 0 6px rgba(0,0,0,0.4)';
document.getElementById('yt-masthead-container').style.borderBottom = '1px solid #bbb';
document.getElementById('page-container').style.marginTop = '51px';
document.getElementById('masthead-expanded').style.marginTop = '51px';