// ==UserScript==
// @name           Spotify for SM
// @namespace      http://userscripts.org
// @description    Adds Spotify search links for SongMeanings.net
// @include        http://www.songmeanings.net/*
// ==/UserScript==

function createLink(str) {
    var a = document.createElement("a");
    a.href = str;
    var img = document.createElement("img");
    img.style.marginLeft = "3px";
    img.src = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGlJREFUeNpi%2BP%2F%2FPwMMuy1j%2BA%2FEBchiIMzEgAn63ZczzkcWwKaoEYgdgAr7cSraGfm%2FAUgZAnECPpNACj8AqQd4FQGtKgBSB2B8FqigArLxQPABaNoEFEVAcB6IBZCsW4DPdwewWQ8QYACnBy8V7gSvaAAAAABJRU5ErkJggg%3D%3D";
    a.appendChild(img);
    return a;
}

var anchors = document.links;

for (var i = 0; i < anchors.length; i++) {
    var lnk = anchors[i];
	var str;
	if ((lnk.href.match(/\/songs\/view\/[0-9]+\/$/) || lnk.href.match(/\artist\/view\/songs\/[0-9]+\/$/)) &&
		!((lnk.innerHTML.match(/^Songs$/)) || (lnk.href.match(/^http:\/\/www\.stumbleupon\.com/)))) {
		
		str = lnk.innerHTML;
		if (str.match(/<strong>/)) {
			var startPos = str.indexOf(">");
			var endPos = str.lastIndexOf("<");
			str = str.substring(startPos+1, endPos);
		}

		var spot = createLink("spotify:search:\"" + str + "\"");
		lnk.parentNode.insertBefore(spot, lnk.nextSibling);
	}
}