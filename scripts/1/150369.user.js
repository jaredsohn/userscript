// ==UserScript==
// @name           Download youtube mp3
// @namespace      Zonedabone
// @version        1.1.0
// @author         Zonedabone
// @description    Adds an mp3 download button to youtube.
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        https://youtube.com/watch*
// ==/UserScript==
button = document.createElement("a");
d = extractYoutubeId(document.location.href);
button.type = "button";
button.id = "watch-mfu-button";
button.setAttribute("class", "yt-uix-expander-collapsed yt-uix-button yt-uix-button-default");
button.setAttribute("target", "_blank");
button.innerHTML = "Download MP3";
button.addEventListener('click', startDownload, true);
heading = document.getElementById("watch-actions");
heading.appendChild(button);
timer = setTimeout(function () {}, 0);
var start;

function startDownload() {
    start = new Date().getTime();
    button.removeAttribute("onclick");
    button.innerHTML = "Loading...";
    clearTimeout(timer);
    button.removeEventListener("click", startDownload, true);
    jQuery.ajax({
        url: "http://url-to-mp3.com/ajax/is_video_cached.php",
        type: "POST",
        data: {
            url: document.location.href
        },
        dataType: "json",
        success: function (a) {
            if (a.requestsPastMin >= 2) {
                reset("Over Minute Limit");
            } else if (a.requestsPastHour >= 15) {
                reset("Over Hour Limit");
            } else if (a.key == 0) {
                reset("Unknown Error");
            } else if (a.key == 1) {
                done(a.privateUrl);
            } else {
                button.innerHTML = "Checking...";
                checkDownload();
            }
        },
        error: function () {
            reset("Connection Error");
        }
    });
}

function done(url) {
    time = Math.round((new Date().getTime() - start) / 100) / 10;
    button.innerHTML = "Downloaded (" + time + "s)";
    button.innerHTML += "<iframe src='" + url + "' style='display: none;' ></iframe>";
    setTimeout(function () {
        button.innerHTML = 'Like MP3Tube on Facebook';
        button.setAttribute("href", "http://www.facebook.com/share.php?u=http://userscripts.org/scripts/show/150369")
    }, 2500);
}

function checkDownload() {
    $.ajax({
        url: "http://url-to-mp3.com/ajax/retrieve_tile_and_thumbnail.php",
        type: "POST",
        dataType: "json",
        success: function (a) {
            if (a.key == 0) {
                reset("Video Not Found");
            } else if (a.key == 3) {
                reset("Video Blocked");
            } else {
                button.innerHTML = "Retrieving...";
                continueDownload();
            }
        }

    });
}

function continueDownload() {
    jQuery.ajax({
        url: "http://url-to-mp3.com/ajax/download_video.php",
        type: "POST",
        dataType: "json",
        success: function (d) {
            if (d.key == 0) {
                reset("Unknown Error");
            } else if (d.key == 3) {
                reset("Throttle Error");
            } else {
                button.innerHTML = "Transcoding...";
                finalizeDownload();
            }
        },
        error: function () {
            reset("Connection Error");
        }

    });
}

function reset(reason) {
    button.innerHTML = reason;
    button.addEventListener('click', startDownload, true);
    timer = setTimeout(function () {
        button.innerHTML = "Download MP3"
    }, 5000);
}

function finalizeDownload() {
    jQuery.ajax({
        url: "http://url-to-mp3.com/ajax/transcode_and_store_video.php",
        type: "POST",
        dataType: "json",
        success: function (a) {
            done(a.privateUrl);
        },
        error: function(){
            reset("Connection Error");
        }
    });
}

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function extractYoutubeId(a) {
    var b = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
        c = a.match(b);
    return c && c[2].length == 11 ? c[2] : !1
}