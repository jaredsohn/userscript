// ==UserScript==
// @name           SargaLink_1.1
// @namespace      http://zsombor.focitipp.com/travian
// @description    Sargaban levo URL-eket alakitja linkke. 
// @include        http://*.travian.*/nachrichten.php?id=*
// ==/UserScript==

var messageOrig = document.getElementById('message').innerHTML;
var cnt = 0;
var MAX_LINK = 50;
var searchIndex = 0;
var messageNew = messageOrig;
var startIndex = messageNew.indexOf('http://',searchIndex);

while(startIndex >= 0 && cnt < MAX_LINK){	
	var endIndex = getEndIndex(messageNew,startIndex,messageNew.length) + startIndex;	

	var url = messageNew.substring(startIndex,endIndex);
	var link = '<a href="' + url + '" target="_blank">' + url + '</a>';
	messageNew = messageNew.substring(0,startIndex) + link + messageNew.substring(endIndex);

	searchIndex = startIndex + link.length - url.length + 1;
	cnt++;
	startIndex = messageNew.indexOf('http://',searchIndex);
}

document.getElementById('message').innerHTML = messageNew;

function getEndIndex(text, start, max){
	var endChars = new Array("<br"," ", ")","(",",","[","]","{","}","|");
	var endIndex = max;
	for(var i = 0; i < endChars.length; i++){
		var end = text.substring(start).indexOf(endChars[i]);
		if(end >=0 && end < endIndex){
			endIndex = end;
		}
	}	
	return endIndex;
}
