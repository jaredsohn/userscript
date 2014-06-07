// ==UserScript==
// @name           FileSearch4Google
// @namespace      tertioptus
// @include        http://www.google.com/*
// @include        http://images.google.com/imghp?hl=en&tab=wi
// @include        http://www.google.com/webhp?hl=en&tab=iw
// @include        http://images.google.com/*
// @include        http://images.google.com/imghp?hl=en&*
// ==/UserScript==

/*
 * Version 1.3 May 21, 2009
 * Written by Benjamin Paige III
 * This script is Public Domain.
 */

var queryFix = '-inurl:htm -inurl:html intitle:"index of" "Last modified" ';

var elements = null;

waitForIt(function () {
	elements = document.getElementsByName("q");
	if(elements.length > 0) {
		var searchBox = elements[0];
		searchBox.value = searchBox.value.replace(queryFix, "");
		
		elements = document.getElementsByName("btnG");
		if(elements.length > 0) {
			var btnG = elements[0];
			var btnFile = btnG.cloneNode(true);
			btnG.parentNode.appendChild(btnFile);
			btnFile.value= "File Search";
			btnFile.addEventListener("click", function(){searchBox.value = queryFix + searchBox.value;},    false);
			return true;
		}
	}
	
	return false;
});



function waitForIt(now, interval, iteration){
	if(interval == null)
		interval = 100;
		
	var find;
		
	function run() {
		if(now())
			window.clearInterval(find);
			
		if(iteration &&  iteration <= 0)
			window.clearInterval(find);
		else
			iteration--;
	}
		
	find = window.setInterval(run,interval);

	return find;
}