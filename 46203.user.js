// ==UserScript==
// @name		FriendFeed Pause Real-Time
// @description	Assigns a hotkey (the Pause/Break key) to pause and resume the FriendFeed real-time feed
// @author		Evan Brown
// @include	http://beta.friendfeed.com/*
// @include	http://friendfeed.com/*
// ==/UserScript==

function pauseUpdates()
{
	var eventObj = document.createEvent('MouseEvents');
	eventObj.initEvent('click', true, true);
	document.getElementsByClassName('l_realtimepause')[0].dispatchEvent(eventObj);
}

function checkForPauseKey()
{
	document.addEventListener('keydown', function(event)
		{
			if (event.keyCode == 19) pauseUpdates();
		}, false);
}

checkForPauseKey();