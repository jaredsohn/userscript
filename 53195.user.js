// ==UserScript==
// @name           rrplay check
// @namespace      pbr/rrpc
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// ==/UserScript==

window.setTimeout( function() {
	rrpc();
}, 100);

function rrpc() {
console.log("rrpc");
	if (document.getElementById("rrplay") == null) {
		setTimeout(rrpc, 1000);
		return;
	}
console.log("rrpc running");	
	var rrplay = document.getElementById("rrplay");
	rrplay.addEventListener("change",function(e) { itWasChanged(e) }, false);
console.log("event listener added");

	itWasChanged();
}

function itWasChanged(e) {
	alert("play is changed");
}

