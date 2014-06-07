// ==UserScript==
// @name           autoreff
// @namespace      http://irctc.co.in
// @description    By pass myplan page.
// @include        http://irctc.co.in*
// @include        https://irctc.co.in*
// @include        https://wwwirctc.co.in*
// @include        https://www.irctc.co.in/rtsa_home.asp*
// ==/UserScript==

function fun(){
	var a=document.body.innerHTML;
	var cutstr=a.substr(4,19);
	if(cutstr=='Service Unavailable'){
    location.reload(true);}
	}
 fun();