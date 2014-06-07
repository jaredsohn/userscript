// ==UserScript==
// @description		让Chrome/Firefox在linux也能上yyfc
// @name			YYFC for Chrome
// @namespace		xndchn@gmail.com
// @include			http://www.yyfc.com/*
// @include			http://yyfc.iq123.com/*
// @include			http://www.yyfc.com/*
// @include			http://yyfc.iq123.com/*
// @version			2.2.1
// ==/UserScript==

try {
	var mediaplayer = document.getElementById('MediaPlayer');
	if (mediaplayer) {
		mediaplayer.outerHTML = "";
		mediaplayer.innerHTML = "";
	}
	var ads = new Array();
	ads[0] = document.getElementById('cproIframe3holder');
	ads[1] = document.getElementById('cproIframe1');
	ads[2] = document.getElementById('cproIframe2');
	ads[3] = document.getElementById('AC_TR86_43104');
	ads[4] = document.getElementById('aswift_0_anchor');
	for (var i = 0; i < ads.length; i++) {
		if (ads[i]) {
			ads[i].outerHTML = "";
			ads[i].innerHTML = "";
		}
	}
	var yyfcplay;
	var playact = document.getElementsByClassName('playact')[0];
	var playact_css = 'text-align: center; height: 40px;'
	playact.className = "";
	playact.style.cssText = playact_css;
	setTimeout(function crack_yyfcplay() {
		var div = document.createElement('div');
		div.setAttribute('onclick', 'return yyfcplay;');
		yyfcplay = div.onclick();
		var player = yyfcplay.player;
		var params = player.data();
		var index = player.number;
		var url = params[index][7];	
		var audio = '<audio id="play5" onended="return next()" autoplay="autoplay" src="' + url + '" contextmenu="contextmenu" controls="controls"></audio>';
		playact.innerHTML = audio;
	
		var script = document.createElement('script');
		script.type="text/javascript";
		script.innerHTML += update;
		script.innerHTML += next;
		script.innerHTML += click;
		document.getElementById("musicbox").appendChild(script);
	}, 100);
	function update(preload) {	
		var params = yyfcplay.player.data();
		var index = yyfcplay.player.number + preload;
		var url = params[index][7];
	
		var player = document.getElementById("play5");	
		player.src = url;
	}
	function next() {	
		yyfcplay.ui.control({'action':'next'});
		update(1);
		return false;
	}
	function click(url) {
		yyfcplay.ui.play(url);
		update(0);
		return false;
	}
	var songtitles = document.getElementsByClassName('songtitle');
	for (var i = 0; i < songtitles.length; i++) {
		var link = songtitles[i].getElementsByTagName('a');
		link[0].onclick = function() {return click(this)};
	}
} catch(e) {
}
var browserName = navigator.userAgent.toLowerCase();
mybrowser = {
	version: (browserName.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
	safari: /webkit/i.test(browserName) && !this.chrome,
	opera: /opera/i.test(browserName),
	firefox:/firefox/i.test(browserName),
	ie: /msie/i.test(browserName) && !/opera/.test(browserName),
	mozilla: /mozilla/i.test(browserName) && !/(compatible|webkit)/.test(browserName) && !this.chrome,
	chrome: /chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)
}
if (mybrowser.chrome) {
	setTimeout(function crack_yyfcxml() {
			var div = document.createElement('div');
			div.setAttribute('onclick', 'loadXMLDoc = function(fname)\
														{\
															var xmlDoc;\
															var xmlhttp = new XMLHttpRequest();\
															xmlhttp.open("GET", fname, false);\
															xmlhttp.setRequestHeader("Content-Type", "text/xml");\
															xmlhttp.send("");\
															xmlDoc = xmlhttp.responseXML;\
															return(xmlDoc);\
														};\
                                                        scripts = document.getElementsByTagName("script");\
                                                        for (i in scripts) {\
                                                            if (scripts[i].text.indexOf("eval") >= 0) {\
                                                                eval(scripts[i].text);\
                                                                break;\
                                                            }\
                                                        }\
                                                        window.onload();');
			div.onclick();
	}, 100);
}