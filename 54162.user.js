

// ==UserScript==
// @name           BegScript
// @namespace      http://localhost
// @description    This script makes begging on Hobowars easier by adding auto beg. Enjoy!
// @author         Xyan Flux
// @version        1.0.0
// @include        http://www.hobowars.com/game.php* 
// @exclude
// ==/UserScript==

var  contents = document.getElementById("contents");
var link;
if(contents){
	if(contents.textContent.match('.*(front of the 7/11|city hall begging).*')){
		link = contents.getElementsByTagName("a")[0].href;
		setTimeout(beg,250);//use a delay
		//location.href = link;//or no delay
	}
}
function beg(){
	location.href = link;
}

Because it's your web

Support userscripts.org by donating

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
