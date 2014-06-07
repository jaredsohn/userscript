// ==UserScript==
// @name          Napster - Put Player in Frame
// @namespace     http://www.micahparker.com/napster
// @description   put that bugger in a frame please!
// @include       http://music.napster.com/*
// @exclude       http://music.napster.com/coolplayer/*
// ==/UserScript==

function putPlayerIntoFrame(b) {
    b.innerHTML = '<frameset rows=="*,0"><frame src="'+location.href+'" /><frame name="NapsterMusicPlayer" /></frameset>';
}

function writePlayerIntoFrame(b) {
    document.write('<frameset rows=="*,0"><frame src="'+location.href+'" /><frame name="NapsterMusicPlayer" /></frameset>');
}

var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if (top == self) {
	if (isChrome) {
		checkBody = function () {
			var bodies = document.getElementsByTagName("body");
			if (bodies.length)
				putPlayerIntoFrame(bodies[0]);
			else
				setTimeout(checkBody,100);
		};
		checkBody();
	}
	else {
		setTimeout(writePlayerIntoFrame,500);
	}
}
else if (isChrome) {
        //need to figure out unsafeWindow workaround for Chrome
	unsafeWindow.Napster.player.openPlayer();
	unsafeWindow.Napster.playerWindow.NapsterPlayer.reconnectMainWindow();
}