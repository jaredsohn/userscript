// ==UserScript==
// @match http://arstechnica.com/*/*/*/*/?comments=1
// @name Ars Technica: Bugs Hates Florida
// @description Auto-posts an animated GIF of Bugs Bunny sawing the state of Florida off the map on Ars Technica posts with the keyword, "Flordia", in the comments thread.
// @version 1.0
// ==/UserScript==

window.onload = function(){
	var
		added = false
		, comments = document.querySelectorAll(".comment .body")
	;
	
	for (var i = 0; i < comments.length && added === false; i++) {
		if (comments[i].innerHTML.match(/\bFlorida\b/i)) {
			document.querySelector("#comment-form-textarea").innerHTML = "[img]http://i.imgur.com/r0AYH.gif[/img]";
			alert("Bugs Bunny is waiting for you to post your comment.");
			added = true;
		}
	}
};