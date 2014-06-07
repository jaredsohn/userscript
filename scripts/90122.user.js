// ==UserScript==
// @name           LJ Repost killer
// @namespace      http://goodsoft.lv/
// @description    Removes reposts from your LJ friendfeed
// @include        http://*.livejournal.com/*
// ==/UserScript==


var divs = document.querySelectorAll("div[class='repost']");
for (var i = 0; i < divs.length; i++) {
	divs[i].style.display = "none";
	divs[i].id = "repost" + i;
	var div_repost = document.createElement('div');
	div_repost.innerHTML = '<a href="#" onclick="$(\'repost' + i + '\').style.display = \'\'; this.style.display = \'none\'; return false"><b>Repost was here. Click to show.</b></a>';     
	divs[i].parentNode.insertBefore(div_repost, divs[i]);
}