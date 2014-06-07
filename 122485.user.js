// ==UserScript==
// @name           Convert2mp3.net Script
// @namespace
// @description    Automatically Convert Youtube Videos to MP3 with Convert2mp3.net
// @include        http://www.youtube.com/watch?*
// ==/UserScript==

document.getElementById("watch-headline-user-info").innerHTML += "<button class=\"subscribe-button yt-uix-button yt-uix-tooltip\" type=\"button\" onclick=\"window.open('http:\/\/convert2mp3.net\/addon_call.php?url=" + self.location.href + "');\" role=\"button\"><span class=\"yt-uix-button-content\">Convert &amp; Download<\/span><\/button>"
