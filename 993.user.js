// ==UserScript==
// @name          CNN Navbar remover
// @namespace     http://mkgray.com:8000/userscripts
// @include       http://www.cnn.com/*
// @description	  Removes CNN navbar
// @exclude
// ==/UserScript==

(function() {
	if(document.reorg){
	    alert("script called on reorged doc");
	}
	else{
	    navtd=document.getElementById("cnnNavBar").parentNode;
	    navtd.parentNode.removeChild(navtd);
	    document.reorg = true;
	}
})();
