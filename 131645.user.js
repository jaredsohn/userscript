// ==UserScript==
// @name           Ted.com better video player
// @version        1
// @namespace      http://reddit.com/r/tedtalks
// @description    Use an alternative player instead of the default flash player on Ted.
// @match          http://*.ted.com/talks/*
// @include        http://*ted.com/talks/*
// ==/UserScript==

(function(){

    var ted_player;
    var ted_counter;
	var ted_vid;

    /**
     * Load the ted videos into the main ted variable
     */
    var loadMetaTags = function(){
        var meta_tags = document.getElementsByTagName('meta');
		var x;
		//alert(meta_tags.length);
		for (x in meta_tags) {
			try {
				if (typeof meta_tags[x].property !== "undefined" && meta_tags[x].property == "og:video") {
					ted_vid = meta_tags[x].content;
				}
				if (meta_tags[x].getAttribute('property') == "og:video") {
					ted_vid = meta_tags[x].content;
				}
			} catch (e) { }
		}
    }

    var addVideo = function(){

        var flashvars = "file=" + ted_vid + "&autostart=true&provider=video";
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
        ted_player.parentNode.replaceChild(flashdiv, ted_player);
    }

    /**
     * Load the main ted variable
     */
    var loadTed = function(){
		ted_player = document.getElementById("streamingPlayerSWF");
        loadMetaTags();
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