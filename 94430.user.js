// ==UserScript==
// @name          A Titleizer
// @namespace     http://lineman.ru/d/a_titleizer.user.js
// @description   Copies "href" attribute into the "title", so you can see a URL in a mouseover popup
// @author        korifey13@lineman.ru
// @include       http://*
// @include       https://*
// ==/UserScript==

var a_tags_ = document.getElementsByTagName("a");

for (i = 0; i < a_tags_.length; i++) {

	var a_title = a_tags_[i].title;
	var a_onclick = a_tags_[i].getAttribute("onclick");

	if (a_onclick == null || a_onclick == "") {
		var a_href = decodeURI(a_tags_[i].href);
	} else {
		var a_href = 'onclick:' + a_onclick;
	}
	if (a_title == null || a_title == "") {
		a_tags_[i].title = a_href;
	} else {
		//if (a_title.replace(/\/$/,"").indexOf(a_href.replace(/\/$/,"")) == -1) { //perfectionism stop here
			a_tags_[i].title = a_title + ' <' + a_href + '>';
		//}
	}
}
