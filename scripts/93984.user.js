// ==UserScript==
// @name           Ted.com JW player
// @version        0.3
// @namespace      http://denbuzze.com/
// @description    Use an alternative player instead of the default flash player on Ted.
// @match          http://*.ted.com/talks/*
// @include        http://*ted.com/talks/*
// ==/UserScript==

(function(){

    var ted;
    var ted_counter;

    /**
     * Load the ted videos into the main ted variable
     */
    var loadTedVideos = function(){
        var ted_video_reg = /(hs|ms|ls)=(|mp4\:)(talk.*?\.(mp4|flv))/gi;

        var ted_video_regs;
        for(var i=0; i<3; i++){
            ted_video_regs = ted_video_reg.exec(ted.flashvars);
            ted.videos[ted_video_regs[1]] = ted_video_regs[3];
        }
    }

    var addVideo = function(){

        var flashvars = "file=http://video.ted.com/" + ted.videos.hs + "&autostart=true&provider=video";
        var width = "100%";
        var heigth = "360";

        var flashobject = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + width +'" height="' + heigth +'" id="player1" name="player1" \
            <param name="movie" value="http://player.longtailvideo.com/player.swf" /> \
            <param name="allowfullscreen" value="true" /> \
            <param name="allowscriptaccess" value="always" /> \
            <param  name="flashvars" value="' + flashvars + '" /> \
            <embed id="player1" \
            name="player1" src="http://player.longtailvideo.com/player.swf" width="' + width +'" height="' + heigth +'" allowscriptaccess="always" allowfullscreen="true" flashvars="' + flashvars + '"/> \
        </object>';

        var flashdiv = document.createElement("div");
        flashdiv.innerHTML = flashobject;
        ted.player.parentNode.replaceChild(flashdiv, ted.player);
    }

    /**
     * Load the main ted variable
     */
    var loadTed = function(){
        // Main TED object
        ted = {
            // Get the flash player object
            player: document.getElementById("streamingPlayerSWF"),
            // Get the flash vars
            // document.querySelectorAll('param[name="flashvars"]')[0].value doesn't work
            flashvars: document.querySelectorAll('param[name="flashvars"]')[0].value,
            videos: {}
        };

        loadTedVideos();
        addVideo();
    };

    /**
     * We need to check if the object with the id streamingPlayerSWF exists
     *  This is only appended after the body onload and after calling the SWFObject function
     *  Therefor we need to loop over it several times
     */
    var interval = window.setInterval(function(){
        ted_counter++;
        if(document.getElementById("streamingPlayerSWF") || ted_counter === 100){
            window.clearInterval(interval);
            loadTed();
        }
    }, 200)

})();