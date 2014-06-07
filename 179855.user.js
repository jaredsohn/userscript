// ==UserScript==
// @name        xiamiurlclear
// @namespace   spdf
// @include     http://www.xiami.com/*
// @exclude     http://www.xiami.com/search*
// @exclude     http://www.xiami.com/collect/search*
// @exclude     http://www.xiami.com/song/play*
// @version     1.2
// @grant       none
// ==/UserScript==
var
url = "http://" + window.location.host + window.location.pathname;
window.history.replaceState(null, document.title, url);