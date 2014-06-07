// ==UserScript==
// @name         Google Inline Player SemperVideo Edition
// @namespace     http://localhost/
// @description   Displays a Player after each MP3 Link on a Website.
// @include      *

// Actually, its not our Code. We found it here Years ago.
// We could not find it, so we contribute it back, with a 
// little alteration for german users. Keep sharing the good stuff.

// ==/UserScript==

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var toggle = document.createElement("a");
			toggle.title = "SV-Player" + i;
			toggle.innerHTML = " [Start MP3]";
			toggle.style.cursor = "pointer";
			toggle.style.border = "none";
			var mp3_url = page_links[i].href;
			var width = 511
			var height = 25
			embed_code = '<embed type="application/x-shockwave-flash" src="http://www.google.com/reader/ui/3523697345-audio-player.swf?audioUrl='+mp3_url+'&autoPlay=true" width="300" height="27" allowscriptaccess="never" quality="best" bgcolor="#ffffff" wmode="window" flashvars="playerMode=embedded" />'
			span.innerHTML = "<br />"
			span.innerHTML += embed_code;
			span.style.display = "none";
			span.id = "SV-Player" + i;
//			toggle.innerHTML = span;
			toggle.addEventListener("click", togglePlayer, true);
			page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling)
			page_links[i].parentNode.insertBefore(toggle, page_links[i].nextSibling)
		}
	}

	function togglePlayer(event) {
		player = document.getElementById(this.title);
		if (player.style.display == "none") {
			player.style.display = "inline";
			this.innerHTML = " [Player verstecken]";
		}
		else {
			player.style.display = "none";
			this.innerHTML = " [Start MP3]";			
		}
	}

})();