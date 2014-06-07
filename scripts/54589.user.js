// ==UserScript==
// @name           CNix
// @namespace      cnix
// @description    Kills the insipid comments from CNet articles
// @include        http://*cnet.com/*
// ==/UserScript==

divs = document.getElementsByTagName('div');
for (i=0; i<divs.length; i++) {
	for (k=0; k<divs[i].attributes.length; k++){
		if (divs[i].attributes[k].value ==  'postTalkback'){
			divs[i].innerHTML = "";
		}
	}
}

spans = document.getElementsByTagName('span');
for (i=0; i<spans.length; i++) {
	for (k=0; k<spans[i].attributes.length; k++){
		if (spans[i].attributes[k].value ==  'commentTease'){
			spans[i].innerHTML = "";
		}
	}
}
