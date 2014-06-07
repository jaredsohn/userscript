// ==UserScript==
// @name            OkCupid ad killer
// @namespace       http://gdorn.nudio.net/greasemonkey
// @description     Removes ads from OkCupid.
// @include         http://*okcupid.com/*
// ==/UserScript==

(function() {


		var adDiv = document.getElementById("profileAdWrap");
		adDiv.parentNode.removeChild(adDiv);
		adDiv = document.getElementById("bottomSponsors");
		adDiv.parentNode.removeChild(adDiv);
		adDiv = document.getElementById("topAd");
		adDiv.parentNode.removeChild(adDiv);
		adDiv = document.getElementById("topAdWrap");
		adDiv.parentNode.removeChild(adDiv);
		adDiv = document.getElementById("lsAd");
		adDiv.parentNode.removeChild(adDiv);

	}
)();





