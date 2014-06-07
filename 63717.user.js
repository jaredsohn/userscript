// ==UserScript==
// @name           4chan antistatic
// @namespace      http://userscripts.org/users/33432
// @description    Adds stylesheet and script from non-static server to board, for times when static is down. Don't forget to adblock static!
// @include        http://*.4chan.org/*
// ==/UserScript==

function forelems(kind,func){var list=document.getElementsByTagName(kind);for(var i=0;i<list.length;i++) func(list[i]);}
function addelem(where,what,func){forelems(where,function(p){var elem=document.createElement(what);func(elem);p.appendChild(elem);});}

forelems('link',function(e){
	e.href=e.href.replace("static.4chan.org/css",location.host);
});

addelem('head','script',function(e){e.src="http://"+location.host+"/script.js"});
