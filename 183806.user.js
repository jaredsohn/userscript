// ==UserScript==
// @name        Embeeded Youtube Title Link
// @namespace   somini
// @description Changes the title of embeeded Youtube videos to a link, so that it can be easily middle-clicked. Only works for HTML5 embeds.
// @updateURL  http://userscripts.org/scripts/source/183806.meta.js
// @downloadURL  http://userscripts.org/scripts/source/183806.user.js
// @icon  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABEElEQVQ4jaWSPU7DQBCF3wGo7DZp4qtEQqJJlSu4jLgBNS0dRDR0QARSumyPRJogkIJiWiToYhrSEPJR7Hptx/kDRhrNm93nb3ZXFsD4psPRwR4AzbjHxd0ru4a8kEgvbf1NePfzbQdJfro52UcS8fHQDyjWCuDz7QpJTOYLZk5nH0zmi/8Dzg/DEqgCmL1fW/PXNwADf4V7AMbuis24txrw1xBJAlHgMizoLdkI4CVBREEZWTKGK9bKqa3G3QDO2G7Z2ljqAYyxPmPgI4XHpw2A7ES+d/unZzlwM2BNnwEKb1QFGJNPabdg9GB1v2993W71BNOamNZEWpfXy5nW8/3U9UQBkqTyy677F6rrkvQDptjzJ/PSbekAAAAASUVORK5CYII=
// @include     https://www.youtube.com/embed/*
// @include     http://www.youtube.com/embed/*
// @run-at		document-end
// @version     1.0
// @grant       none
// ==/UserScript==

var YT_LINK_TIMEOUT = 2000; // 2s

setTimeout(change_title,YT_LINK_TIMEOUT); //I can't find any listeners to attach to

function change_title() {
	var yt_link;
	var hlinks = document.head.getElementsByTagName("link");

	for (var idx=0;idx<hlinks.length;idx++) {
		if (hlinks[idx].getAttribute("rel") == "canonical") {
			yt_link = hlinks[idx].getAttribute('href');
			break;
		}
	}

	var tt = document.getElementsByClassName("html5-title-text")[0];
	var tt_text = tt.firstChild;
	tt.innerHTML = "";
	var a__yt_link = document.createElement("a");
	a__yt_link.href = yt_link;
	a__yt_link.class = "html5-title-text";
	a__yt_link.appendChild(tt_text);
	tt.appendChild(a__yt_link);
}