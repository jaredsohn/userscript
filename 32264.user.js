// ==UserScript==
// @name          IMDB Trailer Advert Remover / Fixer
// @author        avg
// @version       0.56.5
// @namespace     32264
// @include       http://*imdb.com/*PREROLL*
// @include       http://*imdb.com/video*
// ==/UserScript==
var back="AA902D", front="FFFFFF", rollover="FF0000", width=580, height=450;
GM_addStyle("body {background:black!important} #video-player-container{border:none!important;width:630px!important;}");
if(/preroll/i.test(document.URL))
	location.replace(document.URL.match(/\/video.+$/));
else {
	var vid=document.embeds[0];
	vid.setAttribute("style","width:100%;height:100%");
	vid.setAttribute("flashvars",
		vid.getAttribute("flashvars")
			//.replace(/width=\d+/,"width="+width)
			//.replace(/height=\d+/,"height="+height)
			.replace("0x000000","0x"+back)
			.replace("0xCCCCCC","0x"+front)
			.replace("0xFFFFCC","0x"+rollover)
	)
	vid.src+="#r"
}