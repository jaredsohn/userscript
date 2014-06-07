// ==UserScript==
// @name           gr_link_change
// @namespace      http://www.nono150.com/
// @description    to "google reader" link change. "co.jp" -> "https://*.com".
// @include        *
// @exclude        https://www.google.com/reader/*
// @version        201102011000
// ==/UserScript==

(function (){
	
	// co.jp版にアクセスしてたら強制リダイレクト
	var nowadd =window.location.href;
	if(nowadd.match(/google\.co\.jp\/reader\//)){
		nowadd = nowadd.replace(/^http:/,"https:");
		nowadd = nowadd.replace("co.jp","com");
		window.location.href = nowadd;
	}

	var link = document.getElementsByTagName("a");
	for (var cnt1 in link){
    	var href = String(link[cnt1].href);
		if(href.match(/google\.co\.jp\/reader\//)){
			href = href.replace(/^http:/,"https:");
			href = href.replace("co.jp","com");
			link[cnt1].href = href
		}
	}
})();
