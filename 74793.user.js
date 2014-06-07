// ==UserScript==
// @name           YouTube to Downloadable Format
// @namespace      yt2mp3
// @description    Adds a button to convert YouTube videos to a downloadable format. by jaymac407.
// @include        *youtube.*/watch?*
// @include        *dirpy.com/studio/*?yt_convertToDL=1*
// ==/UserScript==
//Changelog, since 1.2:
// v1.2.1: Updated for new YouTube more.

var watchUnlike, newElement;
var scriptVer = "1.2.1";
var unsafeWindow = this['unsafeWindow'] || window;
watchUnlike = document.getElementById('watch-unlike');
if (watchUnlike) {
	//Assume YouTube
	newElement = document.createElement('span');
	newElement.innerHTML = '<button style="margin-left: 20px;" type="button" onclick="yt_convertToDL()" title="Convert this video to a downloadable format" class="master-sprite-new yt-uix-button yt-uix-tooltip" id="watch-convertmp3" data-tooltip-title="Download as MP3/Video" data-tooltip-timer="65"><span class="yt-uix-button-content">Download</span></button><button type="button" title="YouTube Download Button by jaymac407<br />Version:'+scriptVer+' - Note: This uses the Dirpy service. If it\'s down try again later." class="master-sprite-new yt-uix-button yt-uix-tooltip" id="watch-convertmp3qm" data-tooltip-title="?" data-tooltip-timer="65"><span class="yt-uix-button-content">?</span></button>';
	watchUnlike.parentNode.insertBefore(newElement, watchUnlike.nextSibling);
	unsafeWindow.yt_convertToDL = function() {
		var regexa = /(\?|\&)(watch|v)=([\w-]+)/;
		var posmatches = regexa.exec(window.location.href);
		var url = "http://www.dirpy.com/studio/"+posmatches[3]+"?yt_convertToDL=1";
		window.location = url;
	}
}
else {
	//Assume dirpy studio
	document.getElementById('header-parent').innerHTML = '<span class="large">YouTube to Downloadable Format</span><br /><span class="small">Powered by Dirpy</span>';
	document.getElementById('navigation-menu').style.display = "none";
	document.getElementById('navigation-menu-dropdowns').style.display = "none";
	document.getElementById('navigation-menu-dropdowns').nextElementSibling.style.display = "none";
	document.getElementById('youtube-url-table').style.display = "none";
	document.getElementById('footer').style.display = "none";
	document.getElementById('body-content-div').style.height = "500px";
	document.getElementById('related-videos-parent-div').style.visibility = "hidden";
}