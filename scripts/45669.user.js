// ==UserScript==
// @name          YouTube - Add Link to Flip Video
// @description   Simply adds a link to the &flip=1 version of a video.
// @namespace     http://userscripts.org/users/7951
// @include       *youtube.com/watch*
// @exclude       *youtube.com/watch*&flip=1*
// @version       0.1
// ==/UserScript==
(function () {	
	link = document.createElement("div");
	link.innerHTML = '<a class="statLabel" href="'+document.location+'&flip=1" style="">Watch this video Flipped</a> <img id="watch-high-quality-link" class="watch-high-quality" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" style="vertical-align:middle;margin-bottom:3px;cursor:default;" alt="" />'; 
	link.style.textAlign = "center";
	link.style.height = "18px";
	link.style.marginBottom = "4px";
	document.getElementById("watch-ratings-views").appendChild(link);
})();