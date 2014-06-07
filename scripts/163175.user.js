// ==UserScript==
// @name		Streamcloud Downloader
// @namespace	https://userscripts.org/users/493847
// @version		1.3
// @description	Allows you to download videos from Streamcloud via the Download button at the upper right corner of the player
// @match		http://streamcloud.eu/*.*.html
// @copyright	2013 Pwnicorn
// @downloadURL	https://userscripts.org/scripts/source/163175.user.js
// @icon		http://i.imgur.com/MTTvgbC.png
// ==/UserScript==

var videoURL = document.getElementsByName("flashvars")[0].value.split("&file=")[1].split("&")[0].replace(/%3A/g, ":").replace(/%2F/g, "/");
var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
    if (links[i].innerHTML == "Stream") {
        links[i].innerHTML = "Download";
        links[i].href = videoURL;
		links[i].download = document.getElementsByTagName("h1")[0].innerHTML+"."+videoURL.split(".").pop();
        i = i + 1;
        links[i].parentNode.removeChild(links[i]);
    }
}