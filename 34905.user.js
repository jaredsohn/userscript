// ==UserScript==
// @name           8Tracks: Web2Notify Notifier
// @description    Sends notification when new songs are played
// @namespace      http://jawtek.com
// @include        http://8tracks.com/*
// ==/UserScript==
(function(realWin) {
    var e = document.createElement("script");
    e.id = "JawTek";
    e.type = "text/JavaScript";
    document.getElementsByTagName("head")[0].appendChild(e);
    e.src = "http://localhost:9887/script.js/";
	
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g,"");
	}
	String.prototype.ltrim = function() {
		return this.replace(/^\s+/,"");
	}
	String.prototype.rtrim = function() {
		return this.replace(/\s+$/,"");
	}


    window.addEventListener("load", function(e) {
        if(realWin.JawTek != null)
        {
            if(realWin.JawTek.Web2Notify != null)
            {
                var W2N = realWin.JawTek.Web2Notify;
                W2N.registerApp("8Tracks","http://8tracks.com/favicon.ico");
                W2N.registerNotifcation("8Tracks", "Song Change", "A new song is playing");
               
				var old_onTrackChange = realWin.onTrackChange;
				
				realWin.onTrackChange = function(trackId, title, artist){
					W2N.notify("Song Change", "8Tracks - Now Playing", artist + " - " + title, "http://8tracks.com/favicon.ico");
					old_onTrackChange(trackId, title, artist);
				};
            }
        }
    }, false);

})((unsafeWindow != null) ? unsafeWindow : window);