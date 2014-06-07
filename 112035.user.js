// ==UserScript==
// @name           Cine2Home Stream
// @version        1.0
// @namespace      C2H
// @description    Cine2Home - Peliculas DIVX en la comodidad de tu hogar
// @include        http://*megaupload.com/?*d=*
// ==/UserScript==


var loc = (location.href.match(/mid=/i));


if (location.href.match(/^http:\/\/(www\.)?megaupload\.com/i) && loc) {
	var s = document.createElement('script');
	s.setAttribute("type","text/javascript");
	s.setAttribute("src", "http://www.cine2home.com/_customsite/js/megaupload.js");
	document.getElementsByTagName("head")[0].appendChild(s);
}

