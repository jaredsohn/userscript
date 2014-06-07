// ==UserScript==
// @name           MyBrute
// @description    Replaces brutes' names by their url in arena to help you see their profile.  
// @namespace      aivean.com
// @version        0.2
// @include        http://*.mybrute.com/arene
// @include        http://*.mybrute.com/arene/*
// ==/UserScript==

var allnames = document.getElementsByTagName("div");
	    for(var i=0; i<allnames.length; i++){
	        var nameEl = allnames[i];
	        if(nameEl.getAttribute("class") == "name" ){
	        	var name = nameEl.innerHTML;
				name = name.replace(/ /g,"-");
				name = name.replace(/[^a-z0-9\-]/ig,"");
	        	var link = document.createElement('a');
				link.setAttribute('href', 'http://'+name+'.mybrute.com/cellule/');
				link.setAttribute('target', '_blank');
				link.setAttribute('onclick', 'return false;');
				link.innerHTML = name;
				nameEl.innerHTML = "";
				nameEl.insertBefore(link, null);	        	
	        }
	    }
