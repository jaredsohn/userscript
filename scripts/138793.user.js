// ==UserScript==
// @name           YouTube Comment Reply Fix
// @namespace      http://markushenn.de/
// @description    Fixes the problem, that the reply button on youtube comments doesn't open the textarea to write the reply
// @include        http://www.youtube.com/watch?*
// @include        https://www.youtube.com/watch?*
// @include        http://www.youtube.com/all_comments?*
// @include        https://www.youtube.com/all_comments?*
// @copyright      Markus 'voks' Henn, James Coyle
// @version        0.20
// ==/UserScript==

function fixReplyButtons() {
	var buttons = document.getElementsByTagName('button');
	var buttonsFixed = 0;
	for (i=0; i < buttons.length; i++) {
		var button = buttons[i];
		if (button.getAttribute('data-upsell') != null) {
			button.removeAttribute('data-upsell');
			button.setAttribute('data-action', 'reply');
			buttonsFixed++;
		}
	}
	
	// nothing changed? -> don't add page button events
	if (buttonsFixed == 0) {
		return buttonsFixed;
	}
	
	addPageButtonEvents();
	return buttonsFixed;
}

function tryToFixReplyButtons(retryCount) {
	// stop after 10 retries (5 seconds)
	if (retryCount > 10) {
		return retryCount;
	}
	// page wasn't reloaded yet or youtube fixed the bug? -> try again later
	if (fixReplyButtons() == 0) {
		retryCount++;
		setTimeout(function(){
			tryToFixReplyButtons(retryCount);
		}, 500);
	}
	return retryCount;
}

// fix other comment pages when opened
// idea by James Coyle (http://www.youtube.com/jimjimmy1995)
function addPageButtonEvents() {
	if (document.getElementsByClassName) {
		pageButtons = document.getElementsByClassName('yt-uix-pager-button');
		for(i=0; i < pageButtons.length; i++) {
			pageButtons[i].onclick = function() {
				setTimeout(function(){
					tryToFixReplyButtons(0);
				}, 1000);
			};
		}
	}
}

// only run if DOM has loaded
if(document.getElementById('comments-view')) {
	fixReplyButtons();
}
else {
	var waitfordom = setInterval(function(){
		if(document.getElementById('comments-view')) {
			clearInterval(waitfordom);
			fixReplyButtons();
		}
	}, 500);
}
