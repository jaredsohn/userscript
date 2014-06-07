// ==UserScript==
// @name           AddNicoSoundLink
// @version        0.41
// @namespace      http://d.hatena.ne.jp/stv_tribute/
// @description    Add NicoSound's link into a video page of NicoVideo. There is the adding link at right of "twitterにつぶやく" label in detail-info and menu's view.
// @include        http://www.nicovideo.jp/watch/*m*
// author: stv_tribute
// ==/UserScript==


(function () {
	// Generate URL of NicoSound
	var url = document.URL.replace("http://www.nicovideo.jp/watch/", "http://nicosound.anyap.info/sound/");
	if(url.indexOf("?") != -1){
		url = url.substring(0, url.indexOf("?"));
	}

	url = ' | <nobr><a href="'
			 + url
			 + '">にこ☆さうんど＃で開く</a></nobr>';
	document.body.innerHTML = document.body.innerHTML.split('回線で視聴</a></nobr>').join('回線で視聴</a></nobr> | ' + url);
})();
 