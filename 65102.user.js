// ==UserScript==
// @name           Youtube - Load Top Related
// @namespace      theJChaps
// @description    After the current video is over, the video that is the top in the "Related Videos" box is loaded. Might work this into something more complicated later.
// @include        http://www.youtube.com/watch*
// @include        http://*.youtube.com/watch*
// ==/UserScript==

var myScript = function() {
var featured = document.evaluate(
    "//div[@class='watch-ppv-label']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var allLinks = document.evaluate(
    "//div[@class='video-main-content']/div[@class='video-mini-title']/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var topResult = allLinks.snapshotItem(featured.snapshotLength);

	ytPlayer = document.getElementById("movie_player");
	ytPlayer.addEventListener("onStateChange", "onPlayerStateChange");
	
	onPlayerStateChange = function(newState) {
		if (newState == "0") {
			//alert(topResult.href);
			window.location = topResult;
		}
	}
}

document.body.appendChild(document.createElement("script")).innerHTML = "("+myScript+")()";