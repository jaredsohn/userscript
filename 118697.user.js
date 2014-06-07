// ==UserScript==
// @id             youtube_suggestions
// @name           Classic Youtube Suggestions
// @version        1.0
// @namespace      youtube_suggestions
// @author         SEGnosis
// @description    Reverts the youtube suggestions style
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

getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");

setTimeout(function(){
	getScript("http://segnosis.net/user scripts/youtube_suggestions/youtube.js");
},1000);