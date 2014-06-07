// ==UserScript==
// @name           Twimg
// @description    Shows images in someones twitterfeed
// @namespace      http://twitter.com/
// @include        http://twitter.com/*
// @version		   0.1

// By Jens Kohl (jens.kohl+greasemonky AT gmail DOT com)
// ==/UserScript==

var regex = /(http:\/\/(.*?)\.(jpg|png|jpeg|gif)\ ?)/;

var i = 0;
var entrys = new Array();
//entrys.push(document.getElementById('p'));
for each (var entry in document.getElementsByTagName('p')) {
	if (entry.className == 'entry-title entry-content')
		entrys.push(entry);
}

for each (var entry in document.getElementsByTagName('span')) {
	if (entry.className == 'entry-title entry-content')
		entrys.push(entry);
}


for each (var entry in entrys) {
	regex.exec(entry.innerHTML);
	if (RegExp.$1)
		entry.innerHTML = '<div style="width: 464px; overflow: hidden;"><a href="'+RegExp.$1+'"><img src="'+RegExp.$1+'" border=0/></a></div>'+entry.innerHTML;
}