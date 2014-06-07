// ==UserScript==
// @name          Reddit Image Filterer
// @namespace     http://www.reddit.com/user/Lrdwhyt
// @description	  Removes all image posts from /r/all of reddit.com
// @include       http*://*reddit.com/r/all
// @include       http*://*reddit.com/r/all/*
// ==/UserScript==

removeEntries();
document.addEventListener("DOMNodeInserted", function(event) {
	if(event.target.className.match(/sitetable/gi)) { removeEntries(); }
});
function removeEntries() {
	for (x = 0; x < 5; x++) {
		for (var i = 0; i < document.links.length; i++) {
			var findEntries = document.links[i];
			if (findEntries.className.match(/title/gi)) {
				var filext = findEntries.href.split(".").pop();
				if (filext == "jpg" || filext == "png" || filext == "bmp" || filext == "gif") {
					findEntries.parentNode.parentNode.parentNode.parentNode.removeChild(findEntries.parentNode.parentNode.parentNode);
				}
			}
			if (findEntries.parentNode.className == "domain") {
				if (findEntries.innerHTML == "qkme.me" || findEntries.innerHTML == "imgur.com" || findEntries.innerHTML == "quickmeme.com" || findEntries.innerHTML == "s3.amazonaws.com" || findEntries.innerHTML == "i.imgur.com") {
					findEntries.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(findEntries.parentNode.parentNode.parentNode.parentNode);
				}
			}
		}
	}
}