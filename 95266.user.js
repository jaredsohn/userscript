// ==UserScript==
// @name           Shoutbox textarea replacer
// @namespace      http://userscripts.org/scripts/show/95266
// @description    Replacing shoutbox input box on NexusPHP
// @include        http://u2.dmhy.org/*
// @include        https://u2.dmhy.org/*
// @include        http://g.camoe.org/*
// @include        https://g.camoe.org/*
// ==/UserScript==
var shbox = document.getElementsByName('shbox_text').item(0);	//as some nexusphp sites do not have a proper id, thus not getElementById
if (shbox) {
	var altbox = document.createElement('textarea');
	altbox.setAttribute('type', 'text');
	altbox.setAttribute('name', 'shbox_text');
	altbox.setAttribute('id', 'shbox_text');
	altbox.setAttribute('size', '100');
	altbox.setAttribute('style', 'width: 650px; border: 1px solid gray;');
	altbox.setAttribute('rows', '3');
	shbox.parentNode.replaceChild(altbox, shbox);
}

var shsubmit = document.getElementById('hbsubmit');
//Alt + S hotkey
if (shsubmit) {
	shsubmit.setAttribute('accessKey', 'S');
}
//invert color
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	if (links[i].getAttribute('href').indexOf('userdetails') != -1) {
		var foreColorRaw = links[i].style.color
		if (foreColorRaw.length) {
			var foreColor = foreColorRaw.split('(')[1].split(')')[0].split(',');
			var bgColor = new Array();
			for (var j = 0; j < foreColor.length; j++) {
				bgColor[j] = 255 - Number(foreColor[j]);
			}
			links[i].style.backgroundColor = 'rgb('+bgColor[0]+','+bgColor[1]+','+bgColor[2]+')';
		}
	}
}
//edit v1: add @namespace
//edit v2: add invert color function