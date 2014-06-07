// ==UserScript==
// @name            J for Smile
// @author          Abhinay Omkar
// @description     JavaScript to replace J, K or L letters with the corresponding Smileys - particulararly in GMail
// @match       	http://mail.google.com/*
// @match       	https://mail.google.com/*
// @match       	http://*.mail.google.com/*
// @match       	https://*.mail.google.com/*
// ==/UserScript==

var storedHash = window.location.hash;
window.setInterval(function () {
	// perform this function only if the url is changed in Gmail
    if (window.location.hash != storedHash) {
        storedHash = window.location.hash;
        hashChanged();
    }
}, 100);

function hashChanged(){

	var canvas_frame,
		interval = window.setInterval(checkCanvasFrame, 800);

	// this function will be executed in interval to check if iframe: 'canvas_frame' is ready
	function checkCanvasFrame() {
	    canvas_frame = document.getElementById('canvas_frame');
	    if (canvas_frame && canvas_frame.contentDocument) {
	        makeSmileys(canvas_frame.contentDocument);
	    }
	}
	
	function makeSmileys(cf){
		
		var	spans = cf.getElementsByTagName('span'),
			spans_len = spans.length,
			smiley = {
				"J": "<img src='http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif' title=':) Happy'/>",
				"K": "<img src='http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif' title=':| Straight Face'/>",
				"L": "<img src='http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif' title=':( Sad'/>"
			};

		// The MS Outlook uses smileys in Wingdings font, if your local machine doesn't have this font - then, the smileys are replaced with J, K or L 
		// We need find those span tags which uses Wingdings font and replace those letters with yahoo smileys
		for (var i=0; i < spans_len; i++){ 

			if(spans[i].style.cssText.indexOf('Wingdings') != -1) {
	
				spans[i].innerHTML = smiley[ spans[i].innerHTML ] ? smiley[ spans[i].innerHTML ] : spans[i].innerHTML;
			}
		}
	}
}