// ==UserScript==
// @name           a553 VK Music Downloader
// @namespace      vk_download
// @description    Turns music length label into a url to the .mp3 
// @include        http://vk.com/gsearch.php?*
// @include        http://*.vk.com/*
// @include        http://vk.com/*
// ==/UserScript==

function addDownloadButtons()
{
	var p=document.getElementsByClassName("play_new"),i,h,r,t;
	for(i=0;i<p.length;i++)
	{
		var k = p[i].id.substr(4);
		if (document.getElementById("download" + k) != null)
			continue;

		t="audio_info"+k;
		t=document.getElementById(t);
		r=t.value;
		h=t.parentNode.parentNode;
		h=h.getElementsByClassName("duration")[0];

		h.innerHTML = "<a href='" + r.split(',')[0] + "'>" + h.innerHTML + "</a>";
		// var url = document.createElement("a");
		// url.setAttribute("href", r.split(',')[0]);
		// url.setAttribute("id", "download" + k);
		// url.appendChild(document.createTextNode("[D]"));

		//h.appendChild(url);
	}
}

addDownloadButtons();
setInterval(addDownloadButtons, 10000);
