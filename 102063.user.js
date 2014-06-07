// ==UserScript==
// @name           autoreff
// @namespace      http://rctc.co.in
// @description    By pass myplan page.
// @include        *
// ==/UserScript==

function fun(){
	var a=document.body.innerHTML;
	var cutstr=a.substr(4,19);
	if(cutstr=='Service Unavailable'){
    location.reload(true);}
	}
 fun();