// ==UserScript==
// @name           Direct download on bigshare.eu
// @description    Starts your download automatical when entering the website. Avoids the 15 seconds waiting time.
// @include        http://bigshare.eu/*
// ==/UserScript==

unsafeWindow.timeout = 0;
document.getElementById("downloadbtn").click();