// ==UserScript==
// @name           OCZ first post
// @version        1.0
// @description    Skip to first post in OCZ forums
// @include        *.overclockzone.com/forums/showthread.php/*
// @author         Pyxzure
// ==/UserScript==

(function(){
	if(!location.hash || location.hash==''){
		if(location.search.indexOf("?p=")>=0){
			if(location.search.indexOf("&")>=0){
				location.hash = "#post"+location.search.substring(3, location.search.indexOf("&"));
			}else{
				location.hash = "#post"+location.search.substring(3);
			}
		}else if(location.search.indexOf("&p=")>=0){
			if(location.search.indexOf("&", location.search.indexOf("&p="))>=0){
				location.hash = "#post"+location.search.substring(location.search.indexOf("&p=")+3, location.search.indexOf("&"));
			}else{
				location.hash = "#post"+location.search.substring(location.search.indexOf("&p=")+3);
			}
		}else{
			var p=0;
			if(location.pathname.substring(location.pathname.lastIndexOf('/'), location.pathname.lastIndexOf('/')+5) == "/page")
				p=location.pathname.substring(location.pathname.lastIndexOf('/')+5)-1;
			location.hash="#"+(p*20+1);
		}
	}
})()