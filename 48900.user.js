// ==UserScript==
// @name           nored
// @namespace      http://www.hatena.ne.jp/debedebe/
// @description    lingr is dead!!
// @include        http://www.lingr.com/room/*
// ==/UserScript==
var targetNode = document.getElementById('shutdownAnnouncement');
targetNode.parentNode.removeChild(targetNode);