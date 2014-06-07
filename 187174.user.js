// ==UserScript==
// @name       Vodu Helper
// @namespace  http://flipxfx.com
// @version    1.0
// @description  Forward to video file itself so the video can be downloaded or watched directly.
// @match      http://*vodu.ch/*
// @include      http://*vodu.ch/*
// @copyright  2013+, flipxfx
// ==/UserScript==

setTimeout(function() {
	if (document.URL.indexOf("play_hash=") != -1) {
		var flashvars = document.getElementsByName('flashvars')[0].value.substring(7);
		var start = flashvars.substring(flashvars.indexOf('url') + 6);
		window.location.href = start.substring(0, start.indexOf('"'));
	}
        else if (document.URL.indexOf("key=") != -1) {
                //if (window.prompt("URL to copy", document.URL) != "")
                        //window.close();
        }
        else {
                var action = document.getElementsByTagName('form')[0].getAttribute('action');
		var playHash = document.getElementsByName('play_hash')[0].value;
		window.location.href = action + '?play_hash=' + playHash;
        }
}, 500);