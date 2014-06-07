// ==UserScript==
// @name            uvaFix
// @description     Allow click on any link
// @include         http://www.uva.onlinejudge.org/*
// @include         http://uva.onlinejudge.org/*
// @match           http://uva.onlinejudge.org/*
// @match           http://www.uva.onlinejudge.org/*
// @copyright 	    Jomofer
// @version	    0.1
// @license	    http://creativecommons.org/licenses/by-nc-sa/3.0/es/
// ==/UserScript==

var a = document.getElementsByTagName("a");
for(var i=0; i<a.length; i++){

	if(a[i].href){
		a[i].href = a[i].href.replace("com_onlinejudge", "onlinejudge");
	}
}
//document.body.innerHTML = document.body.innerHTML.replace(/option=com_onlinejudge/g, "option=onlinejudge");

