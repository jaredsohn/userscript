// ==UserScript==
// @name       NowVideo Redirect Mobile
// @version    1.0
// @description  Redirect to mobile version of NowVideo to better buffering
// @match      http://www.nowvideo.sx/video/*
// ==/UserScript==

window.location.replace(window.location.toString().replace("video/","mobile/index.php?id="))
