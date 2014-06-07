// ==UserScript==
// @name Twitter: link to high-res profile pic
// @match http://twitter.com/*
// @match https://twitter.com/*
// @include http://twitter.com/*
// @include https://twitter.com/*
// ==/UserScript==

var els = [];

document.addEventListener("DOMNodeInserted", function() {
	els = Array.prototype.slice.call(document.querySelectorAll(
		".profile-picture[href$='_bigger.jpg']"
		+ ", .profile-picture[href$='_bigger.jpeg']"
		+ ", .profile-picture[href$='_bigger.png']"
		+ ", .profile-picture[href$='_bigger.gif']"
		+ ", .profile-picture[href$='_bigger.JPG']"
		+ ", .profile-picture[href$='_bigger.JPEG']"
		+ ", .profile-picture[href$='_bigger.PNG']"
		+ ", .profile-picture[href$='_bigger.GIF']"
	));

	els.forEach(function(el) {
		el.href = el.href.replace(/_bigger(\.(?:png|jpe?g|gif))$/i, "$1");
	});
}, false);