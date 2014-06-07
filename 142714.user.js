// ==UserScript==
// @name           YouTube: asanusta KeepVid redirect button
// @namespace      Aspi
// @description    Adds a button that redirects to KeepVid's YouTube download asanusta service for the video you are currently watching.
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @require        http://usocheckup.redirectme.net/85452.js?method=update
// @version        2.09
// ==/UserScript==

// ==ChangeLog==
// @history        2.09 asanusta KeepVid redirect button
// @history        1.07 Introduced compatibility with Cosmic Panda.
// @history        1.06 Fixed error with double encoding, plus minor fixes.
// @history        1.05 Added HTTPS support and cleaned up code.
// @history        1.04 Changed updater to usoCheckup.
// @history        1.03 Enhanced accessibility to YouTube's data.
// @history        1.02 Added manual update search command.
// @history        1.01 Added this awesome script updater, privatized the data and updated layout.
// @history        1.00 Initial release.
// ==/ChangeLog==

(function () {
	// Global variables.
	// Variable "keepvidURL" is set to using current URL, and is a fallback in case later modification fails.
	var keepvidURL = 'http://www.keepvid.com/?url=' + location.href, container = document.getElementById('watch-actions');
	
	if (container && !document.getElementById('watch-download')) {
		var btn = document.createElement('button'),
			lastContainerChild = container.lastElementChild;
		
		// Button customization.
		btn.className = 'master-sprite yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip';
		btn.id = 'watch-download';
		btn.setAttribute('type', 'button');
		btn.setAttribute('title', 'Download this video via KeepVid');
		btn.setAttribute('data-tooltip', 'Download this video via KeepVid');
		btn.setAttribute('data-tooltip-title', 'Download this video via KeepVid');
		
		// Inner text.
		var txt = document.createElement('span');
		txt.appendChild(document.createTextNode('Download (KeepVid)'));
		txt.setAttribute('class', 'yt-uix-button-content');
		
		btn.appendChild(txt);
		
		// Click function.
		btn.addEventListener('click', function () {
			window.open(keepvidURL, 'downloadWindow');
		}, false);
		
		// If last child element of container exists.
		if (lastContainerChild) {
			// Copy it's class name.
			btn.className = lastContainerChild.className;
			
			// Inject download button after last child.
			container.insertBefore(btn, lastContainerChild.nextSibling);
			
			// Create space between last child and download button.
			lastContainerChild.style.marginRight = '0.5em';
		} else {
			// Just append to the button container.
			container.appendChild(btn);
		}
		
		// If button is out of view (below last child element of container), expand container.
		if (btn.offsetTop > lastContainerChild.offsetTop) {
			var btnMarginTop = '0.5em', containerStyle = getComputedStyle(container);
			
			// Set button margin-top.
			btn.style.marginTop = btnMarginTop;
			
			// Increase container height.
			container.style.height = (parseInt(containerStyle.getPropertyValue('height'), 10) +
				parseInt(btnMarginTop, 10) +
				parseInt(btn.offsetTop, 10) -
				parseInt(btn.offsetHeight, 10)).toString() +
				'px';
		}
	}
	
	// Construct URL redirecting to KeepVid's download page for the current video.
	// Try extract video ID from URL.
	if (location.search.search('v=') !== -1) {
		// Extract video ID from URL.
		keepvidURL = 'http://www.keepvid.com/?url=' + 'http://www.youtube.com/watch?v=' + location.search.split('v=')[1].split('&')[0];
	// If no valid URL has been found, run in external scope to grab the video ID from the global "yt" object, or the fallback.
	} else {
		// Listen for messages.
		window.addEventListener('message', function (event) {
			// Store the video ID.
			keepvidURL = 'http://www.keepvid.com/?url=' + 'http://www.youtube.com/watch?v=' + event.data;
		}, false);
		
		location.assign('javascript:void(' + function () {
			// ** This runs in external scope. **
			// Get video ID from global "yt" object if it exists. Else, fall back to the entire URL (don't post message).
			typeof yt !== 'undefined' && window.postMessage(yt.getConfig('VIDEO_ID'), '*');
		}.toString() + '());');
	}
}());