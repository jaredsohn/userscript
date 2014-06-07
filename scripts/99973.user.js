// ==UserScript==
// @name           SomaFM Popup Player To Tab
// @namespace      http://userscripts.org/users/ps
// @description    Rewrites popup player links on somafm.com so that they open the player on a regular page.
// @include        http://somafm.com/*
// ==/UserScript==

var rwA = document.getElementsByTagName('a');
for (i=0;i<rwA.length;i++) {
	rwA[i].href = rwA[i].href.replace(/javascript:popUpPlayer\(\'(.*?)\'\)/,'http://somafm.com/popup/?$1');
	rwA[i].target = '_popupplayer';
}