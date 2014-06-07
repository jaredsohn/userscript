// ==UserScript==
// @name		Gaydar
// @description	Allow more pageviews for classic users
// @include		http://*.gaydar.*/*
// ==/UserScript==

function OpenDirect(me, him, session, page, sequence)
{
	if (shiftpressed)
	{
		OriginalViewProfile(me, him, session, page, sequence);
	}
	else
	{
		window.open("http://www.gaydar.nl/" + him, "gaydar");
	}
}

function DetectShift(e)
{
	if (e)
	{
		shiftpressed = e.shiftKey;
	}
}

var OriginalViewProfile = window.ViewProfile;
var shiftpressed = false;
window.ViewProfile = OpenDirect;
window.addEventListener("keydown", DetectShift, false);
window.addEventListener("keyup", DetectShift, false);
