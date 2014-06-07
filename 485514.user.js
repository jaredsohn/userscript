// ==UserScript==
// @name        	mediencenter.sport1.de declutter
// @namespace   	sxxe@gmx.de
// @include     	http://mediencenter.sport1.de/de/video/*
// @version     	0.3
// @description		Realigns the playlist and makes the video window bigger.
// @updateURL		https://userscripts.org/scripts/source/485514.meta.js
// @downloadURL		https://userscripts.org/scripts/source/485514.user.js
// @grant       	none
// @require     	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


/*
	Changelog:
		27.4.14 
			- The best video quality will be selected automatically now.
			- The Video overlay is now visible when you hover over the player (and disapers after 3 seconds).
			- Removed video autoplay.

*/

//make jquerry available 
var $ = unsafeWindow.jQuery;

var S1_U;
window.addEventListener ("load", function () {
        S1_U = new Customize ();
    },
    false
);

function Customize() {

    replacePlayer();
    hideElements();

}

function hideElements() {

	// Main Content
	$("#content").remove();

	// Footer
	$("#footer").remove();

	// Player Overlay
	window.setTimeout(function() {
		$(".overlay").hide();
	}, 5000);
	$("div#video" ).mouseover(function() {
		$(".overlay").show();
		window.setTimeout(function() {
			$(".overlay").hide();
		}, 3000);
	});
}

var oldPlayer = '';
function replacePlayer() {

	var player = $("object#kalturaPlayer");
	oldPlayer = player;

	var playerData = player.attr("data");

	$('div#video').height(600);
	$('#kalturaPlayer').height(600);

	// Player API: http://www.kaltura.org/kalorg/kdp/trunk/kdp3Lib/docs/flashvars.txt

	var flashVars = $('#kalturaPlayer param[name="flashvars"]').val();
	$('#kalturaPlayer param[name="flashvars"]').val(flashVars + '&streamerType=rtmp&playlistAPI.autoPlay=false&playlist.visible=false&playlist.includeInLayout=false');

	var newObject = $('#kalturaPlayer').clone (true);
	$('#kalturaPlayer').remove();
	$('div#video').append(newObject);
	var left = $("#player").position().left;
	$('#playerThumbsLarge').attr({'style': 'top: 730px !important; left: ' + left + 'px !important;'}).show();

}
