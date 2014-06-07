// ==UserScript==
// @name       YouTube Watch Later Enhancer
// @namespace  http://akhanubis.tumblr.com/
// @version    0.2
// @description  It allows you to save a video you are watching and the current timestamp locally using HTML5 storage API to continue watching it later.
// @match      http://www.youtube.com/*
// @match      https://www.youtube.com/*
// @copyright  2012+, Pablo Bianciotto
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant none
// ==/UserScript==

//Skip youtube iframes
if (window.top != window.self) return; //don't run on frames or iframes

//Check storage support
if(typeof(Storage)==="undefined") return;

var ytplayer;

var appendVideoToList = function(video){
    var minutes = Math.floor(video.time / 60);
    if (minutes < 10) minutes = '0' + minutes;
    var seconds = video.time - minutes * 60;
    if (seconds < 10) seconds = '0' + seconds;
    $('#akhanu_videos_container').show();
    $('#akhanu_videos_container').css('height', 'auto');
    $('<li class="guide-channel" id="' + video.id + '"><a class="guide-item yt-uix-sessionlink " href="' + video.url +'#t=' + video.time +'s"><span class="thumb"><span class="video-thumb ux-thumb yt-thumb-square-18 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img width="18" src="' + video.img + '" data-thumb="' + video.img + '" data-thumb-manual="1" alt="Miniatura"><span class="vertical-align"></span></span></span></span></span><span class="display-name"><span>' + video.title + '</span></span></a></li>').appendTo($('#akhanu_videos_container .guide-user-links')).hide().fadeIn('slow');
};

var getVideo = function(id){
    return JSON.parse(localStorage.getItem('akhanu_video_' + id));
};

var setVideo = function(video){
    localStorage.setItem('akhanu_video_' + video.id, JSON.stringify(video));
};

var deleteVideo = function(id){
    localStorage.removeItem(id);
};

var getVideosIds = function(){
    return JSON.parse(localStorage.getItem('akhanu_videos'));
};

var setVideosIds = function(ids){
    localStorage.setItem('akhanu_videos', JSON.stringify(ids));
};

var addVideoId = function(id){
    var videos = getVideosIds();
    videos.push(id);
    setVideosIds(videos);
};


$(document).ready(function(){
    console.log('youtube watch later enhancer started');

    if (localStorage.getItem('akhanu_videos') == null) setVideosIds([]);

    ytplayer = unsafeWindow.document.getElementById("movie_player");
    ytplayer.setAttribute('allowscriptaccess','always');

    var container_clone = $('#guide-container').children().first().clone(true);
    container_clone.find('.guide-module-toggle-label h3>span').text('Watch later enhancer');
    container_clone.find('.guide-module-content').attr('id', 'akhanu_videos_container').html('<div id="akhanu_header" class="guide-section guide-header"><div class="guide-item-container personal-item"><h3><a class="guide-item narrow-item" data-upsell="guide"><span class="display-name">Watch later enhancer</span></a></h3><ul class="guide-user-links yt-box"><li><a class="guide-item" id="akhanu_add_video"> Agregar video actual </a></li><li><a class="guide-item" id="akhanu_clear_videos"> Borrar todos </a></li></ul></div></div>');
    $('#guide-container').append(container_clone);

    $.each(getVideosIds(), function(i,id){
        appendVideoToList(getVideo(id));
    });

    $('#akhanu_add_video').on('click', function(e){
        e.preventDefault();
        var next = 0;
        for(; getVideo(next) != null; next++);
        var video = { id: next, url: ytplayer.getVideoUrl(), img: $('#watch7-user-header .yt-user-photo img').attr('src'), time: Math.floor(ytplayer.getCurrentTime()), title: $('#eow-title').text() };
        setVideo(video);
        appendVideoToList(video);
        addVideoId(video.id);        
    });

    $('#akhanu_clear_videos').on('click', function(e){
        e.preventDefault();
        if (confirm('¿Estás seguro?'))
        {
            localStorage.clear();
            setVideosIds([]);
            $('#akhanu_videos_container .guide-user-links .guide-channel').fadeOut('slow', function(){
                $(this).html('');
            });
        }
    });
});