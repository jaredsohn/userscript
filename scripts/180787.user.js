// ==UserScript==
// @name        Porn Free Extratorrent
// @namespace   http://userscripts.org/users/536675
// @description Removes Porn Links from Extratorrent Main Page
// @include     http://extratorrent.cc/*
// @include     http://extratorrent.com/*
// @include     http://extratorrent.ws/*
// @version     1.1.0
// @grant       none
// ==/UserScript==
function codeBody() {
	$(".tl:eq(3)").next().remove();
	$(".tl:eq(3)").next().remove();
	$(".tl:eq(3)").remove();
        $(".mi533").parent().parent().remove();
}
var scriptNode = document.createElement('script');
scriptNode.setAttribute('type','text/javascript');
scriptNode.setAttribute('src','http://code.jquery.com/jquery-1.10.2.min.js');
document.head.appendChild( scriptNode );
window.addEventListener ("load", codeBody, false);