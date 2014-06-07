// ==UserScript==
// @name          BANNED!
// @namespace     http://gamepiranha.com
// @description   Adds an extra bit of weight to the end of the ETS banhammer.
// @include       http://*bungie.net/*
// ==/UserScript==

var spans = new Array();
spans = document.getElementsByTagName('span');

for (var i = 0; i < spans.length; i++)
	if (spans[i].id == "ctl00_mainContent_postRepeater1_ctl01_ctl00_postControl_skin_BlacklistedTextLabel")
		changeAvatar();

function changeAvatar() {
	for (var i = 2; i < document.images.length; i++)
		if (isAvatar(document.images[i])) {
			document.images[i].src="http://i435.photobucket.com/albums/qq77/unusedsniper/heretic.jpg";
			break;
		}
}

function isAvatar(A) {
	var loc = A.src;
	var parts = new Array();
	parts = loc.split('/');
	var screen = parts[5];
	if ((parts[6] == "avatars" || parts[3] == "Stats") || parts[4] == "Halo3")
		return true;
	return false;
}

//
// o hai
// wat r u doin in hear
// r u messin with mai script
//
