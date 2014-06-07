// ==UserScript==
// @name        RedLetterMedia HTML5 Video Support
// @namespace   http://userscripts.org/users/elcattivo
// @description Watch videos from RedLetterMedia without Flash Player.
// @include     http://redlettermedia.com/*
// @include     http://thatguywiththeglasses.com/*
// @version     201305181433
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @grant       GM_xmlhttpRequest
// @icon        http://a2.twimg.com/profile_images/736113940/plinkett_icon_reasonably_small.jpg
// ==/UserScript==

var videoPlayerTemplate = '<video width="100%" controls poster="THUMB_URL" preload="none"><source src="VIDEO_URL?showplayer=42" type="video/mp4"><p>Your browser does not support H.264/MP4.</p></video>';
$('embed[src*="blip.tv"]').hide();
$('iframe[src*="blip.tv"]').remove();

var buildPlayer = function(info) {
    var player = videoPlayerTemplate.replace('VIDEO_URL', info.video).replace('THUMB_URL', info.thumbnail);
    return player;
};

var buildInfoUrl = function(videoSource) {
    if (videoSource.indexOf('#') !== -1) {
        var videoId = videoSource.split('#')[1];
            infoUrl = 'http://blip.tv/play/VIDEO_ID.x'.replace('VIDEO_ID', videoId);
    } else {
        var infoUrl = videoSource.replace(/DFaw$/, '').split('%')[0] + ".x";
    }

    return infoUrl;
};

var fetchInfo = function(videoSource, callback) {
    var infoUrl = buildInfoUrl(videoSource);

    GM_xmlhttpRequest({
        method: 'GET',
        url: infoUrl,
        onload: function(response) {
            var episodeInfo = $(response.responseText).find('#EpisodeInfo'),
                thumbnail = episodeInfo.data('episode-thumbnail').replace('THUMB_WIDTH', '640').replace('THUMB_HEIGHT', ''),
                video = episodeInfo.data('bliphd720') || episodeInfo.data('blipsd') || episodeInfo.data('blipld');
            callback({thumbnail: thumbnail, video: video});
        }
    });
};

var replacePlayer = function(flashPlayer) {
    var videoSource = $(flashPlayer).attr('src');

    fetchInfo(videoSource, function(info) {
        var html5Player = $(buildPlayer(info)).hide();
        $(flashPlayer).before(html5Player.fadeIn('slow')).remove();
    });
};

var flashPlayer = $('embed[src*="blip.tv"]').toArray();
flashPlayer.forEach(replacePlayer);