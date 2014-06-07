// ==UserScript==
// @name           MixTurtle: Web2Notify Notifier
// @description    Sends notification when new songs are played
// @namespace      http://jawtek.com
// @include        http://*.mixturtle.com/*
// @include        http://mixturtle.com/*
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
                W2N.registerApp("MixTurtle","http://mixturtle.com/favicon.ico");
                W2N.registerNotifcation("MixTurtle", "Song Change", "A new song is playing");
               
				var old_p_playSong = realWin.p_playSong;
				
				realWin.p_playSong = function(el){
					W2N.notify("Song Change", "MT - Now Playing", el.textContent.trim().replace(/#/g, ""), "http://mixturtle.com/favicon.ico");
					old_p_playSong(el);
				};
            }
        }
    }, false);

})((unsafeWindow != null) ? unsafeWindow : window);