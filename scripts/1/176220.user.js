// ==UserScript==
// @name        OpenSubtitles - Skip Annoying Page
// @namespace   http://userscripts.org/users/1
// @include     http://www.opensubtitles.org/*
// @include     http://www.opensubtitles.us/*
// @version     2013.08.24
// @grant       none
// @updateURL      https://userscripts.org/scripts/source/176220.meta.js
// @downloadURL    https://userscripts.org/scripts/source/176220.user.js

// ==/UserScript==
// zip  http://dl.opensubtitles.org/en/download/sub/3557846
// site http://dl.opensubtitles.org/en/subtitleserve/sub/3557846

//get the ID
subtitleID = document.getElementsByClassName("site")[0].id;

//uncheck the downloader-executable-checkbox
//taken from http://userscripts.org/scripts/show/175978
document.getElementById("cbDownloader").checked = false; 

//change the link-location of the Download-button
var submatch = subtitleID.match(/s\_(.*)/);
document.getElementsByClassName("bt-dwl")[0].href = "http://dl.opensubtitles.org/en/download/sub/" + submatch[1];