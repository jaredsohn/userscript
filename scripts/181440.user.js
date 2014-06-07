// ==UserScript==
// @name        kekflags
// @namespace   
// @author      QXQ
// @description adds kekflags to [s4s]
// @include     http://boards.4chan.org/s4s/*
// @include     https://boards.4chan.org/s4s/*
// @version     1.0
// @grant       none
// @run-at      document-end
// ==/UserScript==

var allMessages = document.querySelectorAll('.postMessage');

for(var i=0; i<allMessages.length; i++){
	lineList = allMessages[i].innerHTML.split('<br>');
	var contains = false;
	lineList.forEach(function(line, index){
		if(line.indexOf('#') == 0 || line.indexOf('</br>#') == 0){
			contains = true;
			line = '<span style="color:rgb(17, 34, 204);">' + line + '</span>';
			lineList[index] = line;
		}
	});
	if(contains) allMessages[i].innerHTML = lineList.join('<br>');	
}