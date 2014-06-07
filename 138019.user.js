// ==UserScript==
// @name           Youtube Remember Play Time
// @description    Updates the url of a youtube video periodically to preserve your progress
// @author         Jake Hiller
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include        *youtube.com/*
// @version        1.0
// @run-at         document-end
// ==/UserScript==


window.onload = function() {
    var ytplayer = document.getElementById('movie_player');

    function checkPlayer() {
        if (ytplayer && typeof(ytplayer.getCurrentTime()) == 'number') {
            GM_log('ytplayer active!!');
            setTime('false');
            setYoutubeTime();
            watchTimer();
        };
    };

    function setTime(status) {
        $(ytplayer).attr('data-settime', status);
    };

    function getTimeStatus() {
        return $(ytplayer).attr('data-settime');
    };

    function watchTimer() {
        watchStateChange();
    };

    function watchStateChange() {
        console.log('watching state change');
        var playerState = ytplayer.getPlayerState();

        if (playerState === 2 && getTimeStatus() == 'false') {
            // Player is paused and time was not already set, update time in URL
            setYoutubeTime();
            // set the data attribute so we don't start playing again
            window.setTimeout(function() {
                ytplayer.pauseVideo();
                GM_log('paused video');
                setTime('true');
            } , 1000);
        }
        else if (playerState === 1)
        {
            // Player is playing, let the loop go
            setTime('false');
        }

        window.setTimeout(watchTimer, 5000);
    };

    function setYoutubeTime() {
        var curtime = ytplayer.getCurrentTime();
        history.pushState(null, null, '#t='+curtime+'s');
    };

    window.onBeforeUnload = function() {
        setYoutubeTime();
    };

    window.setTimeout(checkPlayer, 5000);
};
