// ==UserScript==
// @name           Youtube Spam Filter
// @namespace      anonymous@anonymous.com
// @description    Filter YouTube Spam
// @include        http://www.youtube.com/*
// @grant          none
// ==/UserScript==


function removeSpam(){
var signed = document.getElementsByClassName('end');
	// Remove Featured Video
	var container = document.getElementsByClassName('related-video-featured');
	if (container[0] != null)
		container[0].parentNode.removeChild(container[0]);

	// Remove Recommended Videos
	var elements = document.getElementsByClassName("video-list-item");
	var i = 0;
	while (i < elements.length) {
		if (elements[i].innerHTML.indexOf('Recommended for you') > -1) {
			elements[i].parentNode.removeChild(elements[i]);
		} else {
			i++;
		}
	}

// (Signed Out)
	if (signed[0] == null) {
		// Remove Main Page Content
		container = document.getElementsByClassName('  home  clearfix');
		if (container[0] != null) {
			document.getElementById("page").removeChild(document.getElementById("content"));
			// Use Background Image
			document.body.style.background = "url(http://fc09.deviantart.net/fs71/f/2010/269/5/6/raiden_rising_by_madarax19-d2zj0vg.jpg) no-repeat center center";
		}

		// Remove Left Container
		container = document.getElementById("guide-subscription-suggestions-section");
		container.parentNode.removeChild(container);
	}

// (Signed In)
	else {
		// Remove Recommended Channels
		container = document.getElementsByClassName('branded-page-v2-secondary-col');
		if (container[0] != null)
			container[0].parentNode.removeChild(container[0]);
	}
}

removeSpam();