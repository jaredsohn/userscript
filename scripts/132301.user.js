// ==UserScript==
// @name         Gametrailers Video.js
// @namespace    http://dev.discry.be/
// @author       Georges Discry
// @description  Replaces the Flash player on gametrailers.com with the HTML5 compatible Video.js player.
// @downloadURL  https://userscripts.org/scripts/source/132301.user.js
// @updateURL    http://userscripts.org.nyud.net/scripts/source/132301.meta.js
// @include      http://www.gametrailers.com/videos/*
// @include      http://www.gametrailers.com/full-episodes/*
// @require      http://code.jquery.com/jquery-1.7.2.min.js
// @require      http://userscripts.org/scripts/source/100842.user.js
// @version      0.5.4
// ==/UserScript==

// Return the video mimetype based on its extension
function videoType(url) {
    var m = url.match(/\.(?:(mp4)|(ogg|ogv)|(webm))(?:\?.*)?$/i);
    if (!m) return;
    if (m[1]) return 'video/mp4';
    if (m[2]) return 'video/ogg';
    if (m[3]) return 'video/webm';
}

$(document).ready(function() {
    // Use the CSS style from the original Flash player
    GM_addStyle(".player_wrap .video-js { margin: 0px auto; }");
    // Retrieve the video information from the page
    var player = document.getElementById('video-player');
    var token = $('.download_button').data('token');
    var mgid = $('.download_button').data('video');
    // Don't do anything if there is no player to replace or keep the original
    // player if there is no download button 
    if (!player || !mgid) return;
    // Request the download URL
    $.getJSON('/feeds/video_download/' + mgid + '/' + token, function(data) {
        if (!(data && data.url)) return;
        // Keep the original player if the video is not in a supported format
        var vType = videoType(data.url);
        if (!vType) return; 

//      // Event usually sent when clicking on the download button (not required)
//      contentEval(function() {
//          mtvn.btg.Controller.sendLinkEvent({linkName: 'download_' + pageName});
//      });

        // Prepare the attributes of the video and source elements
        var oldPlayer = $(player);
        // Must be passed to the jQuery video element with .attr() because of
        // 'width' and 'height'
        var videoAttrs = {
            id: 'video-player-vjs',
            'class': 'video-js vjs-default-skin',
            width: oldPlayer.data('width'),
            height: oldPlayer.data('height'),
            controls: true,
            preload: 'auto',
            autoplay: oldPlayer.data('autoplay'),
        }
        var sourceAttrs = {
            src: data.url,
            type: vType,
        };
        // Replace the player with a video element
        var newPlayer = $('<video />').attr(videoAttrs);
        oldPlayer.wrap(newPlayer).before($('<source />', sourceAttrs));
    }); 

    // Inject inside the page for the Flash fallback to work
    contentEval(function() {
        // Add the Video.js CSS to the document
        var videojsCSS = document.createElement('link');
        videojsCSS.rel = 'stylesheet';
        videojsCSS.type = 'text/css';
        videojsCSS.href = 'http://vjs.zencdn.net/c/video-js.css';
        document.head.appendChild(videojsCSS);
        // Add the Video.js script to the document
        var videojsScript = document.createElement('script');
        videojsScript.src = 'http://vjs.zencdn.net/c/video.js';
        // Apply the Video.js transformation on the video once the script is loaded (use GameTrailers' jQuery)
        videojsScript.onload = function() { $('video.video-js').each(function() { _V_(this) }) };
        document.head.appendChild(videojsScript);
    });
});
