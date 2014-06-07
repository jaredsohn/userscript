// ==UserScript==
// @name        No Swag
// @namespace   Mana
// @include     http://www.jeuxvideo.com/forums/1-*
// @include     http://www.jeuxvideo.com/forums/3-*
// @version     1
// ==/UserScript==


(function () {
	"use strict";
	var swag;
	
	swag = {};
	swag.clean = function clean(text) {
		var list, car;
		list = ['ÀÁÂÃÄÅàáâãäåa', 'Bb', 'Ççc', 'Ðd', 'ÈÉÊËèéêëe', 'Ff', 'Gg', 'Hh', 'ÌÍÎÏìíîïi', 'Jj', 'Kk', 'Ll', 'Mm', 'Ññn', 'ðòóôõöøÒÓÔÕÖØo', 'Pp', 'Qq', 'Rr', 'šŠs', 't', 'ÙÚÛÜùúûüu', 'v', 'w', 'Xx', 'Ýýÿy', 'Žžz']
		while (list.length > 0) {
			car = list.shift();
			text = text.replace(new RegExp("[" + car + "]", "g"), car[car.length - 1]);
		}
		return text;
	};
	swag.treat = function treat(post) {
		var i, text;
		for (i = 0; i < post.childNodes.length; i += 1) {
			if (post.childNodes[i].nodeType === Node.TEXT_NODE) {
				post.childNodes[i].nodeValue = this.clean(post.childNodes[i].nodeValue);
			}
		}
	};
	swag.exec = function exec() {
		var col, post, i
		col = document.getElementById("col1");
		if (col) {
			post = col.getElementsByClassName("post");
			for (i = 0; i < post.length; i += 1) {
				this.treat(post[i]);
			}
		}
	};
	swag.exec();
}());