// ==UserScript==
// @name          PTP Hide Ratings
// @namespace     kannibalox
// @description   Hides site ratings until a movie is rated
// @summary	  Hides site ratings until a movie is rated
// @include	  *passthepopcorn.me/torrents.php?id=*
// @grant 	  metadata
// ==/UserScript==

function hideSiteRating() {
	document.getElementById("user_rating").parentNode.style.visibility = "hidden";
	document.getElementById("user_total").parentNode.style.visibility = "hidden";
	document.getElementById("starsiteCur0").style.display = "none";
}

function showSiteRating() {
	document.getElementById("user_rating").parentNode.style.visibility = "visible";
	document.getElementById("user_total").parentNode.style.visibility = "visible";
	document.getElementById("starsiteCur0").style.display = "";
}

function isUserRated() {
	return (document.getElementById("user_vote").innerHTML) ? true : false;
}

if (!isUserRated()) {
	hideSiteRating();
}

//Kinda useless, but it's already in here
elem = document.getElementById("removebutton")
origOnClick = elem.onclick;
elem.onclick = function() {
	origOnClick();
	hideSiteRating();
}

//When the user rates the movie, reveal the site's rating.
document.getElementById("star0").addEventListener("click", showSiteRating);
