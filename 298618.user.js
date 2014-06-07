// ==UserScript==
// @name       	  	YouTubeEmbeded
// @version    	  	1.0.14
// @description   	Redirect YouTube url to an embeded one to maximize video in window.
// @homepageURL   	http://userscripts.org/scripts/show/298618   
// @downloadURL   	http://userscripts.org/scripts/source/298618.user.js  
// @updateURL     	http://userscripts.org/scripts/source/298618.meta.js  
// @include  		http*://*.youtube.com/*
// @include   		http*://youtube.com/*
// ==/UserScript==

function a(){
	var url = window.parent.location.href
	var list = "",time = ""
	if (url.indexOf("list=") > -1) list = "&list=" + ((url.split('list='))[1].split('&'))[0]
	if (url.indexOf("t=") > -1) time = "&start=" + ((url.split('t='))[1].split('&'))[0]
	if (url.indexOf("watch?") > -1 && url.indexOf("noredirect") < 1) {
		var id = (((url.split('v='))[1].split('&'))[0].split('#'))[0]
		location.replace("https://www.youtube.com/embed/" + id + "?autoplay=1" + list + time)
	}
	else if (url.indexOf("embed") > -1) {
		var id = ((url.split('embed/'))[1].split('?'))[0]
		history.replaceState(1,1,"/watch?v=" + id + list + "&noredirect")
		document.body.appendChild(document.createElement('search')).innerHTML = '<form action="http://www.youtube.com/results" method="get"><center><input name="search_query" placeholder="Search" style="position:relative;top:-25px;color:#fff;background-color:#1b1b1b;text-align:center;border:none"/></form>'
		document.body.querySelectorAll(".html5-player-chrome")[0].appendChild(document.createElement('search')).innerHTML = '<form action="http://www.youtube.com/results" method="get"><center><input name="search_query" placeholder="Search" style="color:#fff;background-color:#1b1b1b;text-align:center;border:none;margin-top:4px"/></form>'
	}      
}a()
unsafeWindow.yt.pubsub.instance_.subscribe('init-watch', function(){a()})
unsafeWindow.yt.pubsub.instance_.subscribe('player-playback-start', function(){a()})