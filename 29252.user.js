// ==UserScript==
// @name           Better Flash Player for Spankwire.com
// @namespace      ca_guy @ http://www.spankwire.com
// @description	   Small simple script that allows users to use the older and more popular flash player on http://www.spankwire.com.
// @version        0.0001
// @include        http://*.spankwire.com/*
// @include        http://spankwire.com/*
// ==/UserScript==

var video = document.getElementById('ctl00_Body_ctl00_divFeatureControlEnabled');
if (video){
	var script = video.getElementsByTagName('script');
	script = script[0].innerHTML;
	script = script.substring(script.indexOf("/*")+2,script.indexOf("*/")-2);
	var outScript = document.createElement('script');
			outScript.type = "text/javascript";
			outScript.innerHTML = script;
	document.getElementsByTagName('body')[0].appendChild(outScript);
};
