// ==UserScript==
// @name          YoutubeHDLinker
// @namespace     http://nabolog.seesaa.net/
// @description   Replace all youtube links to HQ video link.
// @include       http://*
// @include       https://*
// ==/UserScript==

(function() {
var allLinks = document.getElementsByTagName("a");

for (i = 0; i < allLinks.length; i++)
{
	var href = unescape(allLinks[i].href);
	if(href.match(/youtube\.com\/watch?/) && !href.match(/fmt=18/)){
        if(href.match(/fmt=/))
            result = href.replace(/fmt=[0-9]{1,2}/, "fmt=18");
        else
            result = href+"&fmt=18";
        allLinks[i].setAttribute("href", result);
    }
}
})();
