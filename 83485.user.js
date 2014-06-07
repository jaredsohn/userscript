// ==UserScript==
// @name           TwitterNoFollowRec
// @description    Removes the who-to-follow recommendations
// @include        http://twitter.com/*
// @match        http://twitter.com/*
// ==/UserScript==

{
	var fdiv = document.getElementById("recommended_users")
	if (fdiv) {
		fdiv.innerHTML = "";
	}
}