// ==UserScript==
// @name 	Reddit - Hide Side
// @namespace 	http://userscripts.org/users/nothix
// @description Hide side Div on Reddit
// @version     0.4
// @date 	2012-10-08
// @creator 	nothix
// @include          http://*.reddit.com/*
// @match          http://*.reddit.com/*
// ==/UserScript==

var divs = document.getElementsByClassName('side');
alert(divs.length);
for(var i=0; i<divs.length; i++) {
	//if(divs[0].style.display=="none"){
		divs[0].style.display="";
	//}else{
	//	divs[0].style.display="none";
	//}   			
}