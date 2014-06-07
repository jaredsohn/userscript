// ==UserScript==
// @name	  Pun.pl bez sygnaturek
// @description   Usuwa sygnaturki na forach pun.pl
// @version       1.0
// @include       http://*.pun.pl/*
// @include       http://pun.pl/* 
// ==/UserScript==

(function() {
	var getsig = document.getElementsByTagName('div');
	var attribs = "";
		for (var i = getsig.length - 1; i >= 0; i--) {
			attribs = getsig[i].getAttribute('class');
			if(attribs == "postsignature"){
				getsig[i].parentNode.removeChild(getsig[i]);
			}
		}
	}
)();