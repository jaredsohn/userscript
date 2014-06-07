// ==UserScript==
// @name			Auto-silence Youtube
// @namespace		https://github.com/adityavm/userscripts/blob/master/autosilenceyoutube.user.js
// @description		Automatically quieten Youtube when visiting a video-page by redirecting to Quietube
// @include			*youtube.com/results*
// @include			*youtube.com/watch*
// @include			*quietube.com/v.php*
// @match			http://*.youtube.com/results*
// @match			http://*.youtube.com/watch*
// @match			http://*.quietube.com/v.php*
// ==/UserScript==



var loc = window.location.href;
var host = (function(){
	var h = window.location.host;
	h = h.match(/(?:www.)?(\w+).(?:com)/);
	return h[1];
})();

var tokens = (function(){//closure?
	if(window.location.search == "")
		return {};
	
	var t = {}, qs = loc.substring(loc.indexOf('?')+1).split('&');//query string
	for(i in qs){
		var mt = qs[i].split('=');
		t[mt[0]] = mt[1];
	}
	return t;
})();

if(host == 'youtube'){
	if(loc.indexOf('results') != -1){//on a search results page
		/**
		* Rewrite the links so that they
		* go directly to Quietube
		*/

		//the main results
		var rc = document.getElementsByClassName('result-item-main-content');
		for(i in rc){
			if(rc[i].getElementsByTagName){
				var title = rc[i].getElementsByTagName('h3')[0],//it's always the first one
					a = title.getElementsByTagName('a')[0],
					url = a.href;

				console.log(url);
				a.href = "http://quietube.com/v.php/"+url;
			}
		}

		//the little playlist links
		var pl_a = document.getElementsByClassName('playlist-detail-title');
		for(i in pl_a)
			pl_a[i].href = "http://quietube.com/v.php/" + pl_a[i].href;

	}

	if(loc.indexOf('watch') != -1){//on a video page
		if('disable_asyujs' in tokens && tokens['disable_asyujs'] == 1)
			return;
		
		if(loc.indexOf('quietube') == -1)
			window.location = "http://quietube.com/v.php/"+loc;
	}
}

if(host == 'quietube'){
	if(loc.indexOf('quietube') != -1){//on a quietube page
		//rewrite the link back to youtube with a ?disable_asyujs=1
		var link = document.getElementById('credits').getElementsByTagName('p')[0].getElementsByTagName('a')[2];
		link.href += "&disable_asyujs=1";
	}
}
