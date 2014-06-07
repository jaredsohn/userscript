// ==UserScript==
// @name        pingshu8播放脚本
// @namespace   http://userscripts.org/scripts/show/12345
// @include     http://www.pingshu8.com/List*/*
// @version     1.0.1
// ==/UserScript==

// ==UserScript==
// @name           评书吧
// @namespace      http://www.pingshu8.com/List_Play/
// @include        http://www.pingshu8.com/List*/*
// ==/UserScript==


window.setTimeout( function() {
	try {
		//mp3playerUrl = "http://54.248.221.39/mp3player.swf";
		//mp3playerUrl = "http://96.245.187.180/player_mp3_multi.swf";
		//mp3playerUrl = "http://123.243.220.233:88/player_mp3_multi.swf";
		//mp3playerUrl = "http://wonderboyweb.free.fr/player_mp3_multi.swf";
		mp3playerUrl = "http://63.249.36.50:3819/player_mp3_multi.swf";
		window.mp3list = window.objMmInfo[0].mmUrl;
		window.mp3title = window.objMmInfo[0].mmTit;
		for (i=1; i<window.objMmInfo.length; i++)
		{
			window.mp3list = window.mp3list + "|" + encodeURI(window.objMmInfo[i].mmUrl);
			window.mp3title= window.mp3title+ "|" + window.objMmInfo[i].mmTit;
		}
		player = document.createElement('div');
		player.innerHTML = "<object type=\"application/x-shockwave-flash\" data=\""+mp3playerUrl+"\" width=\"400\" height=\"200\" id=\"mp3player\" name=\"mp3player\">" +
			"<param name=\"wmode\" value=\"transparent\" />" + 
			"<param name=\"movie\" value=\""+mp3playerUrl+"\" />" + 
			"<param name=\"flashvars\" value=\"volumewidth=100&volumeheight=10&width=400&height=200&autoplay=1&showvolume=1&showinfo=1&mp3="+window.mp3list+"&title="+window.mp3title+"\" />" + 
			"</object>";
		player.align="center";
		document.getElementsByTagName("table")[0].style.display="none";
		document.body.appendChild(player);
	} catch (e) {
		//alert( e );
	}
}
, 1000);