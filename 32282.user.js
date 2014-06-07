// ==UserScript==
// @name          uncomment@mixi 
// @namespace     http://www.blurblue.com/
// @description   This is a script that delete the objectionable guys comment.
// @include       http://mixi.jp/*
// ==/UserScript==
window._content = window; // for Opera

(function() {
	var hisId = []; //example  [0000000000, 1111111111, 2222222222];
	
	if(document.getElementById("enqueteComment")) {
		var com = document.getElementById("enqueteComment");		
	}
	else if(document.getElementById("eventComment")) {
		var com = document.getElementById("eventComment");		
	}
	else if(document.getElementById("bbsComment")) {
		var com = document.getElementById("bbsComment");		
	}	
	for (var i=0; i<hisId.length; i++){
		var a = com.getElementsByTagName("a");
		for (t=0; t<a.length; t++){
			var thisId = new RegExp(hisId[i]);
			if (a[t].href.match(thisId)) {
				a[t].parentNode.parentNode.style.display = "none";
			}
		}
	}
})();