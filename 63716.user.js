// ==UserScript==
// @name           4chan burichan hardcode
// @namespace      http://userscripts.org/users/33432
// @description    Adds stylesheet and script from zip server to board, for times when static is down. Don't forget to adblock static!
// @include        http://zip.4chan.org/*
// ==/UserScript==

function add(kind,func){
    var head,elem;
	
    if(!(head=document.getElementsByTagName('head')[0])) return;
	
    elem=document.createElement(kind);
    func(elem);
    head.appendChild(elem);
}

add('script',function(e){e.src="http://zip.4chan.org/script.js"});
add('style',function(e){e.innerHTML='@import "http://zip.4chan.org/burichan.9.css"'});
