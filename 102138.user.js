// ==UserScript==
// @name           Confirm navigating away from Youtube videos
// @namespace      http://userscripts.org/users/217860
// @include        *youtube.com/watch*
// ==/UserScript==

var needToConfirm = true;

unsafeWindow.onbeforeunload = mybunload;

function mybunload() {
   if(needToConfirm) return 'Are you sure you want to leave this video?';
}