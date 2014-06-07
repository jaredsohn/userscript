// ==UserScript==
// @name           Tone Highlights
// @include        https://service.portal.tieto.com/*
// @namespace      +++
// @description    Tone Highlights by pribyluk@tieto
// ==/UserScript==




var theTone = document.getElementsByTagName('td');
var theLinks = document.links;
//alert(theLinks.length);

for(i=0; i<theTone.length; i++) {
   if(theTone[i].innerHTML.toLowerCase().indexOf('patrol agent is unreachable') != -1) {
	theTone[i].style.backgroundColor = 'red';
	}
   if(theTone[i].innerHTML.toLowerCase().indexOf('drive c: has') != -1) {
	theTone[i].style.backgroundColor = 'yellow';
	}
   if(theTone[i].innerHTML.toLowerCase().indexOf('apoteket ab') != -1) {
	theTone[i].style.backgroundColor = 'lime';
	}
}


ancs = document.getElementsByTagName("td");
for(i=0;i<=ancs.length;i++){
	if(ancs[i].innerHTML.match(/720p/gi)){
		ancs[i].innerHTML = ancs[i].innerHTML.replace("720p", "<span style='color: #0000F5; background-color: white; font-weight:bold'>720p</span>");
	}
} 




