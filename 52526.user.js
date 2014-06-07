// ==UserScript==
// @name           Icons on Arts & Letters Daily
// @namespace      http://elzr.com/posts/icons-on-arts-letters-daily
// @description    Add website icons to the links in Arts & Letters Daily
// @include        http://www.aldaily.com*
// @author         Eliazar Parra elzr.com
// ==/UserScript==

//tools

document.body.innerHTML += '<style>img.f {border:0; vertical-align:top; padding-right:3px; width:16px; height:16px; visibility:hidden; -moz-opacity:.5} a:hover img.f {-moz-opacity:1}</style>';
var as = document.getElementsByTagName('a');
var l = as.length;
for(var i=0; i<as.length; i++) {
	if(as[i].href && (!as[i].innerHTML.match(/<img/)))
		as[i].innerHTML = '<img class="f" onload="this.style.visibility=\'visible\'" src="'+as[i].href.replace(/(http:\/\/.*?\/).*$/,'$1favicon.ico')+'" />'+as[i].innerHTML;
}
