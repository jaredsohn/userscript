// ==UserScript==
// @name           Dunwoody-No-More
// @namespace      *.boingboing.net
// @description    Blocks unfunny Percival Dunwoody first posts.
// @include        http://*.boingboing.net/*
// ==/UserScript==


	var allDivs, thisDiv;

	allDivs = document.getElementsByTagName('div');

	for (var i = 0; i < allDivs.length; i++) {
	    thisDiv = allDivs[i];

		if ( thisDiv.getAttribute("class") == "commentnew" ) { 

			if(/\"\>Percival Dunwoody\</.test(thisDiv.innerHTML)) { 
				thisDiv.innerHTML="";
			}

		}
	}