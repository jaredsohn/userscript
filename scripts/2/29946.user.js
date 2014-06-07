// ==UserScript==
// @name           Big Youtube Video
// @namespace      samkellett
// @description    200% YouTube video size.
// @include        *youtube.com/watch*
// ==/UserScript==

(function() {
	var createAndAttachDiv = function() {
		var div = document.createElement("div");
		div.id = "watch-video-quality-setting";
		document.getElementById("watch-views-div").appendChild(div);
		return div;
	};
	var div = (document.getElementById("watch-video-quality-setting")) ? 
		document.getElementById("watch-video-quality-setting") : 
		createAndAttachDiv();
	var anchor = document.createElement("a");
	anchor.innerHTML = "zoom by 200%";
	anchor.className = "hLink";
	anchor.href = "#";
	anchor.style.fontWeight = "bold";
	anchor.addEventListener("click", function(e) {
		var movie = document.getElementById("movie_player");
		if (this.innerHTML == "zoom by 200%") {
			this.innerHTML = "return to 100%";
			document.getElementById("watch-other-vids").style.marginTop = "710px";
			movie.height = 697;
			movie.width = 875;
		} else {
			this.innerHTML = "zoom by 200%";
			document.getElementById("watch-other-vids").style.marginTop = "0";
			movie.height = 385;
			movie.width = 480;
		}
	}, true);
	div.appendChild(document.createElement("br"));
	div.appendChild(anchor);
})();