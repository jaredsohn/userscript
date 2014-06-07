// ==UserScript==
// @name        playlist_from_YT_links
// @namespace   nietrzymryjskiowczarek
// @include     http://www.wykop.pl/mikroblog/*
// @include     http://www.wykop.pl/tag/*
// @version     1
// @grant       none
// ==/UserScript==


function main()
{
    var player;
    var playlist = [];
    var originalTitle = document.title;
    function appendElements()
    {
        $('#content').prepend($('<div>').attr('id', 'playerWrapper').css({'text-align': 'center', 'overflow': 'hidden'}).append($('<div>').attr('id', 'player')))
        $('#playerWrapper').prepend($('<div>').attr('id', 'controllPlayerWrapper').css('text-align', 'left'));
        $('#controllPlayerWrapper').prepend($('<span>').attr({'id': 'handlePlayer', 'class': 'playerH'}).text('Odtwórz wszystkie (' + playlist.length + ').').css({'display': 'inline-block', 'font-weight': 'bold', 'cursor': 'pointer'}));
        $('<span>').css({'display': 'inline-block', 'font-weight': 'bold', 'cursor': 'pointer'}).text('Odśwież.').attr({'id': 'refreshPlaylist'}).insertAfter('#handlePlayer');
        $('<span>').css({'display': 'inline-block', 'font-weight': 'bold'}).attr('class', 'marginright5 marginleft5').text(' | ').insertAfter('#handlePlayer');
    }


    function parseLinks(i, e)
    {
        var href = e.getAttribute('href');
        if (href.indexOf('http://www.youtube.com') > -1)
        {
            var pattern = /http:\/\/www.youtube.com\/watch\?.*?v=(.{11})/i;
        } else if (href.indexOf('http://youtu.be') > -1) {
            var pattern = /http:\/\/youtu.be\/(.{11})/i;
        }
        var result = pattern.exec(href);

        if (result[1])
            playlist.push(result[1]);
    }


    function handlePlayer()
    {
        if (typeof player === "undefined")
            onYouTubeIframeAPIReady();

        if ($(this).is('.playerD'))
        {
            $(this).removeClass('playerD').addClass('playerH');
            $('#playerWrapper').animate({'height': 16}, 'fast');
        } else
        {
            $(this).removeClass('playerH').addClass('playerD');
            $('#playerWrapper').animate({'height': 416}, 'fast');
        }
    }


    function appendYoutubeAPI()
    {
        if (typeof player === "undefined") {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: null,
            events: {
                'onReady': onPlayerReady,
                'onStateChange' : onStateChange
            }
        });
    }
    
    function onStateChange(event)
    {
        if(event.data == YT.PlayerState.PLAYING){
            document.title = '\u25b6 '+originalTitle;
        }else if(event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.CUED){
            document.title = '\u25A0 '+originalTitle;     
        }else if(event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.BUFFERING){
            document.title = '\u258c\u258c '+originalTitle;     
        }else{
            document.title = originalTitle;
        }
    }

    function onPlayerReady()
    {
        player.cuePlaylist(playlist);
    }


    function buildPlaylist()
    {
        playlist = [];
        $('a[href^="http://www.youtube.com"]:not(".openEmbed"), a[href^="http://youtu.be"]:not(".openEmbed")').each(parseLinks);
        $('#handlePlayer').text('Odtwórz wszystkie (' + playlist.length + ').');
        if (typeof player !== "undefined")
            player.cuePlaylist(playlist);
    }

    buildPlaylist();
    appendElements();
    appendYoutubeAPI();
    $('body').on('click', '#handlePlayer', handlePlayer);
    $('body').on('click', '#refreshPlaylist', buildPlaylist);

}

if (typeof $ == 'undefined') {
    if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        addJQuery(main);
    }
} else {
    main();
}
function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}