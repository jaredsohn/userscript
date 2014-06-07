// ==UserScript==
// @id             Youtube_like_fav
// @name           Youtube Like & Fav
// @version        1.0
// @namespace      youtube_like_fav
// @author         SEGnosis
// @description    Auto fav a video when you like it
// @include        *.youtube.*
// @run-at         document-end
// ==/UserScript==

function getScript(scriptSource) {
	var script = document.createElement('script');
	var head = document.getElementsByTagName('head')[0];
	
	if(scriptSource.indexOf("http") == 0){
		script.src=scriptSource;
	}
	else
		script.innerHTML = scriptSource;
	
	script.type = "text/javascript";
	head.appendChild(script);
}

function getStyleSheet(sheetSource){
	var sheet = document.createElement('link');
	var head = document.getElementsByTagName('head')[0];
	
	if(sheetSource.indexOf("http") == 0){
		sheet.href=sheetSource;
	}
	else
		sheet.innerHTML = sheetSource;
		
	sheet.type = "text/css";
	sheet.rel = "stylesheet";
	
	head.appendChild(sheet);
}

getScript("https://raw.github.com/jamespadolsey/jQuery-Plugins/master/cross-domain-ajax/jquery.xdomainajax.js");
setTimeout(function(){
	getScript("http://segnosis.net/user scripts/youtube_like_fav/youtube_like_fav.js");
},500);