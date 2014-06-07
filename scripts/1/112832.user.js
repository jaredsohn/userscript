// ==UserScript==
// @name           Youtube Easy Share - Share URL and Title Easily!
// @namespace      http://userscripts.org/users/86645
// @include        http://www.youtube.com/watch*
// ==/UserScript==

// Listen for click on the Share button.
document.getElementById('watch-share').addEventListener('click', function () {
	changeShareText();
}, false);

// Trims whitespace from left and right of string.
function trim(text) {
	return text.replace(/^\s*|\s*$/g, '');
}

// Holds original share URL.
var shareUrl;
// Changes text
function changeShareText(share) {
	if (share) {
		// Input found, change text.
		// Get URL and title of video.
		if (!shareUrl) {
			shareUrl = share.value;
		}
		var title = document.getElementById('eow-title');
		if (share && shareUrl && title) {
			// Set then focus/select text.
			share.value = '"' + trim(title.textContent) + '" - ' + shareUrl;
			share.focus();
			share.select();
		}
	}
	else {
		// YouTube does lots of Ajax, loop back to see if the input is made yet.
		var share = document.querySelector('input.share-panel-url');
		setTimeout(function () {
			changeShareText(share);
		}, 100);
	}
}