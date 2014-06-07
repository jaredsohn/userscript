// ==UserScript==
// @name           salingSapaMyStyle
// @namespace      http://cakyus.wordpress.com
// @description    custom style for www.salingsapa.com
// @include        http://www.salingsapa.com/*
// ==/UserScript==

// go to hell to annoying wallpaper
GM_addStyle('body { font-family: Consolas; }');
GM_addStyle('#wallpaper { background: #E1E1E1; }');

// red colors, you are kidding me , right ?
GM_addStyle('#appside .block_title' 
	+ ', #appcenter .block_title'
	+ ', .block_title a:visited'
	+ ', #jcow_main_box'
	+ ', #jcow_main_box a, #jcow_main_box a:visited'
	+ ' { color: #747880; }'
	);

// too small fonts, is this a secrect mission to make me blind ?
GM_addStyle('div.tab_things, div.tab_thing' 
	+ ' { font-size: normal; }'
	);
	
// replace youtube embed
var ps = document.getElementsByTagName('param');
if (ps != undefined && ps[0] != undefined) {
	var os = document.getElementsByTagName('object');
	var yt = ps[0].getAttribute('value');
	var i = yt.lastIndexOf('/');
	var i2 = yt.indexOf('&');
	var vid = yt.substr(i+1,i2-i-1);
	var yv = 'http://www.youtube.com/watch?v='+vid;
	os[0].innerHTML = '<a'
		+ ' href="' + yv + '"'
		+ ' target="_blank"'
		+ '>YouTube</a>'
		;
}
