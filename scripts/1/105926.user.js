// ==UserScript==
// @name           bbcode-plus
// @namespace      http://userscripts.org/users/133663
// @description    Client-side bbcode parser for Google+
// @include        https://plus.google.com/*
// ==/UserScript==

GM_addStyle(".aa{font-family:Mona,'MS PGothic'}.b,.expert{font-weight:bold}.i,.expert{font-style:italic}.o,.expert{text-decoration:overline}.u,.expert{text-decoration:underline}.s{text-decoration:line-through}.code,.m{white-space:pre}.spoiler,.spoiler:hover{color:black;background:black;text-decoration:none}.spoiler a{color:black}.spoiler:hover,.spoiler:hover a{ olor: white}.secret{filter:alpha(opacity=0);-moz-opacity:0;opacity:0}.secret:hover{filter:alpha(opacity=60);-moz-opacity:0.6;opacity:0.6}.sup{font-size:xx-small;vertical-align:top}.sub{font-size:xx-small;vertical-align:bottom}.hymmnos{font-family:Hymmnos}.madoka{font-family:MadokaRunes}");

var make_it_so = function(){
	var divim = document.getElementsByTagName('span');
	window.setTimeout(make_it_so,6000);
	for (var i in divim) {
		divim[i].innerHTML = divim[i].innerHTML.replace(/\<wbr\>/gi, "");
		divim[i].innerHTML = divim[i].innerHTML.replace(/\[(.*?)\](.*?)\[\/\1]/gi, "<span class=\""+"$1"+"\">"+"$2"+"</span>");
	}
	
}; make_it_so();