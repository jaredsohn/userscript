// ==UserScript==
// @name           mitx-autoplay
// @namespace      thomasloch
// @version        0.10
// @description    Automatically load next item in a lecture sequence when the video playback ends
// @include        https://6002x.mitx.mit.edu/courseware/*
// @include        https://6002x.mitx.mit.edu/section/*
// ==/UserScript==

/*

MITx Auto-play
--------------

Automatically load next item in a lecture sequence when the video playback
ends.

To-do:
- add a so-many seconds timeout before advancing to the next video
	to give the user a chance to cancel the auto-play and have a break
	before continuing
- add a control somewhere on the page so people can turn auto-play on
	and off in a nicely integrated fashion

*/


unsafeWindow.console.log('Autoplay loading... ');

function check_autoplay() {
	// find player object on page (do nothing if there is none)
    var pw = document.getElementById('myytplayer');
	if(! pw) return;

	// get the /real/ player so we can use getCurrentTime()/getDuration() as expected...
	var player = XPCNativeWrapper.unwrap(pw);
	if(! player) return;

	/*unsafeWindow.console.log(
		'AP check... ' + player.getCurrentTime() + ' / ' + player.getDuration() +
		' (' + player.getPlayerState() + ')'
	);*/

	// disable auto-play if the video isn't loaded yet or is paused/buffering (or is very short!)
	if(player.getDuration() < 10) return;
	//if(player.getPlayerState() == -1) return;
	//if(player.getPlayerState() >= 2) return;

	// unstarted (-1), ended (0), playing (1),
	// paused (2), buffering (3), video cued (5)


	// did we run out of video yet?
    //if(player.getCurrentTime() != player.getDuration()) return;
    if(player.getPlayerState() != 0) return;

    unsafeWindow.console.log('Autoplay continue!');

	// figure out which sequence item we are at right now
	var current_vid;
	var v = document.getElementsByTagName('a');
//	for each(var e in v) {
	for(var e, j = 0; (e = v[j]) != null; j++) {
		if(e.getAttribute('class') && e.getAttribute('class') == 'seq_video_active') {
			current_vid = e;
			break;
		}
	}
	var current_id = parseInt(current_vid.id.replace(/^tt_/, ''));

	// click on next sequence item
	document.getElementById('tt_' + (current_id + 1)).click();

	// FIXME: should we prevent the autoplay from retriggering in case the
	// click isn't processed sufficiently by the time the function
	// is called again by setInterval()?
}

// do the above once every second now. that should be a reasonable trade-off
// between low idle load and usability
setInterval(check_autoplay, 1000);


