// ==UserScript==
// @name           Vimeo Downloader fixed
// @namespace      thisguy_859@yahoo.com
// @description    For videos where download is not enabled by the uploader, it'll insert a download link anyway.
// @version        1.1.3
// @include        http://vimeo.com/*
// @include	   http*://vimeo.com/*
// @grant          none
// ==/UserScript==

//based on script by pigeontech: http://userscripts.org/scripts/show/112123

location.href = "javascript:(" + function () {
    var fplayer = document.getElementsByClassName("f player")[0].getAttribute("id");
    var clipo = eval(fplayer.replace("player_", "clip"));
    var formats = clipo.config.video.files.h264;
    var vidtimes = clipo.config.request.timestamp;
    var vidid = clipo.config.video.id;
    var sign = clipo.config.request.signature;
    var htmlfinal;
    var vidname = document.getElementsByClassName("video_meta")[0].getElementsByTagName("h1")[0].innerHTML;
    for (i = formats.length - 1; i >= 0; i--) {
        var d = "//player.vimeo.com/play_redirect?quality=" + formats[i] + "&codecs=h264&clip_id=" + vidid + "&time=" + vidtimes + "&sig=" + sign + "&type=html5_desktop_local";
        if (i == formats.length - 1) {
            htmlfinal = "<strong>" + formats[i].toUpperCase() + ":</strong> " + '<a href="' + d + '">' + vidname + "</a><br>";
        } else {
            htmlfinal = "<strong>" + formats[i].toUpperCase() + ":</strong> " + '<a href="' + d + '">' + vidname + "</a><br>" + htmlfinal;
        }
    }
    document.getElementsByClassName("description")[0].innerHTML = document.getElementsByClassName("description")[0].innerHTML + "Download MP4: <br>" + htmlfinal;
} + ")()";
