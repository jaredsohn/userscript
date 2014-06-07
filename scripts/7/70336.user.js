// ==UserScript==
// @name	  Udskriftsvenlig links på Computerworld.dk
// @version	  1.01
// @description	  Computerworld med links til udskriftsvenlige udgave i nyt vindue
// @include	  http://www.computerworld.dk/*
// @include	  http://computerworld.dk/*
// @include   computerworld.dk/*
// ==/UserScript==

(function() { 
  
	var l ;
	var url;
	var pos;
	l = document.links;
	for ( var i = 0; i < l.length; i++ ) { 
		url = l[i].href;
		if ( !(url.match(/art/) == null ) ) {
			if (url.match(/\?/)) {
				pos = url.indexOf("?");
				pos = pos - 1;
			} else {
				if (url.match(/[0-9]$/)){
					pos = url.length + 1;
				} else {
					pos = url.lastIndexOf("/");					
				}
			};
   		l[i].href = url.substr(0, pos) + "?op=print";
		   l[i].target = "_blank";
		}
	}
}
)
(); 