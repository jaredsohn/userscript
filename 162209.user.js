// ==UserScript==
// @author         Youtube Auto Liker
// @name           Youtube Auto Liker
// @description    Youtube Auto Liker
// @icon           http://i145.photobucket.com/albums/r240/r3nmgod/autolike.jpg
// @include        *.youtube.com/watch*
// @version        1.1
// @updateURL      http://userscripts.org/scripts/source/117576.meta.js
// @installURL     http://userscripts.org/scripts/source/117576.user.js
// ==/UserScript==

setTimeout(function() {
    var xmlhttp;
    if (window.XMLHttpRequest ) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    var ajxurl = "http://www.youtube.com/watch_actions_ajax?action_like_video=1&video_id=" + unsafeWindow.yt.config_.VIDEO_ID + "&plid=" + unsafeWindow.yt.config_.PLAYBACK_ID;
    var ajxdata = "screen=h%3D" + screen.height + "%26w%3D" + screen.width + "%26d%3D32&session_token=" + unsafeWindow.yt.tokens_.watch_actions_ajax;
    
    xmlhttp.open("POST", ajxurl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(ajxdata);
    
    document.getElementById("watch-like").className += " yt-uix-button-toggled";
}, 100);