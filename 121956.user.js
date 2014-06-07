// ==UserScript==
// @name           Helper for Tianya, Sohu Forum and Tieba
// @namespace      www.lotus-scent.com
// @include        http://*.tianya.cn/*
// @include        http://tianya.cn/bbs/*
// @include        http://*.sohu.com/*
// @include        http://tieba.baidu.com/*
// ==/UserScript==

var gearSrc = "http://download.lotus-scent.com/sunbox/1.1.0.1018/gear/gear.js";


var gearId = 'c4816191-e39e-4653-a950-b7501523d8ef';
var proxyUrls = {
    'www.zxproxy.com' : true,
    'proxite.net' : true
};
function init() {
	//check if it's https. We don't set foot into https
	var host = window.location.host;
	if (window.location.href.indexOf("https://") === 0 && !proxyUrls[host]){
		return;
	}
	
	//check if gear.js is installed by any reason
	if(document && document.getElementById) {
		var script = document.getElementById(gearId);
		if (script){
		    return;
		}
	}	
	
	var webgearScript = document.createElement("script");
    webgearScript.src = gearSrc;
	webgearScript.charset = "utf-8";
	webgearScript.setAttribute("id", gearId);
	var head = document.getElementsByTagName('head')[0];
	if(head) {
		head.appendChild(webgearScript);
	}
}

init();
