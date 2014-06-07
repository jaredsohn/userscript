// ==UserScript==
// @name           Youtube Auto Pause
// @description    Prevents Youtube videos from auto-playing. Supports new layout (as of 2012-05-18). Pauses videos on User pages as well.
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// ==/UserScript==

(function(){

// We should inject script node to page, because somehow YouTube API don't work from Greasemonkey.
var jsToInject = ( (<><![CDATA[		
	(function(){
	
		var o_onYouTubePlayerReady = window.onYouTubePlayerReady || function(){};
		
		window.onYouTubePlayerReady = function(playerId) {
			o_onYouTubePlayerReady(playerId); //Call original onYouTubePlayerReady.
			
			var player = document.getElementById("movie_player") ||     // www.youtube.com/watch*
			             document.getElementById("movie_player-flash"); // www.youtube.com/user/*
			
			if(!player) return;
			
			// Rarely pauseVideo() fails, so here we ensure that the video is paused. It works.
			setTimeout(function func(){
				player.pauseVideo();
				if(player.getPlayerState() != 2)
					setTimeout(func, 50);
			}, 0);
		};
		
	})();	
]]></>).toString() );

addJS_Node(jsToInject);

function addJS_Node(text, s_URL) {
    var scriptNode                      = document.createElement ('script');
    scriptNode.type                     = "text/javascript";
    if (text)  scriptNode.textContent   = text;
    if (s_URL) scriptNode.src           = s_URL;

    var targ    = document.getElementsByTagName('head')[0]
                || document.body
                || document.documentElement;
    targ.appendChild (scriptNode);
}

})();
