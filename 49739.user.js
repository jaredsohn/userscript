// ==UserScript==
// @name           twitglance
// @namespace      www.petitnoir.net
// @description   add link http://twitter/string if @string
// @include       *
// @exclude       http://spreadsheets.google.com/*
// ==/UserScript==

///////////////////////////////////////////////////////

(function (){
//本文
	var section = document.body;
	name =new RegExp("@[a-zA-Z0-9_]+","gm");
		var reg = section.innerHTML.match(name);
		if(reg){
			for (i=0; i<reg.length;i++){
			check = new RegExp("[a-zA-Z0-9_]"+reg[i] , "gm");
		var regc = section.innerHTML.match(check);
			if(!regc){
			link = "@<a href='http://twitter.com/" + reg[i].substring(1) + "'>" +reg[i].substring(1) +"</a>";
			section.innerHTML = section.innerHTML.replace(reg[i],link,"g");
			}
			}
		}
		
	})();