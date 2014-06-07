// ==UserScript==
// @name           FrameAFette
// @namespace      http://www.martufone.com/gm
// @description    making frames more friendly
// @include        http://wpop*.libero.it/*
// ==/UserScript==

(function(){
	var i = 0
	var fs = document.getElementsByTagName('FRAME')
	for(i=0; i<fs.length; i++) {
		fs[i].setAttribute("scrolling", "auto")
		fs[i].removeAttribute("noresize")
		fs[i].setAttribute("frameborder", "1")
		fs[i].setAttribute("framespacing", "1")
		fs[i].setAttribute("border", "3")
	}

	fs = document.getElementsByTagName('FRAMESET')
	fs[0].setAttribute("rows", "0,*,0")
	fs[0].setAttribute("cols", "0,*,0")
	attr = fs[1].getAttribute("rows")
	if (attr.split(/,/).length == 3) {
		fs[1].setAttribute("rows", "70,0,*")
	}
	for(i=0; i<fs.length; i++) {
		fs[i].setAttribute("scrolling", "auto")
		fs[i].removeAttribute("noresize")
		fs[i].setAttribute("frameborder", "1")
		fs[i].setAttribute("framespacing", "1")
		fs[i].setAttribute("border", "3")
	}
})();

// if (/^http:\/\/sito.com/.test(window.location.href)) {

