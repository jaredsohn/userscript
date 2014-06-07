// ==UserScript==
// @name           pepi
// @namespace      http://userstyles.org
// @description    remove ads bellow/text on the right and center it
// @include        http://*.xvideos.com/*
// ==/UserScript==

var current = window.location.href;
var last = document.referrer;

var args1 = last.match(/\w+=(\d+)/g);
var args2 = current.match(/\w+=(\d+)/g);

alert('woot');

for (var i = 0; i < args2.length; i++) {
	for (var j = 0; j <args1.length; j++) {
		var currentArg = args2[i];
		var lastArg = args1[j];

		if (currentArg.split('=')[0] == lastArg.split('=')[0]) {
			if (currentArg.split('=')[1] != lastArg.split('=')[1]) {
				
				if (parseInt(currentArg.split('=')[1]) == parseInt(lastArg.split('=')[1]) + 1) {
					var pageArg = currentArg.split('=')[0];
					var page = parseInt(currentArg.split('=')[1]);
					var prevPage = page-1;
					var nextPage = page+1;
					
					document.onkeydown = (function(e){
					    if (e.keyCode == 37) { 
					       var newUrl = current.replace(pageArg + '=' + page, pageArg + '=' + prevPage);
					       alert(newUrl);

					       document.location.href = newUrl;

					       return false;
					    }
					});
					
				}
			}		
		}
	}
}