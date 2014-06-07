// ==UserScript==
// @name          XTube - NoNagScrean
// @namespace     http://www.xtube.com/
// @description	  Does not click through the nag screen like other scripts, but makes it so it never appears in the first place.
// @include       http://*.xtube.com/*
// ==/UserScript==


(function() {

var links = document.getElementsByTagName("a");

for(var i=0; i < links.length; i++){

	if(links[i].href.toLowerCase().indexOf("http://www.xtube.com/play_re.php") == 0) {
		links[i].href += "&cont=y";
	}
}
})();


