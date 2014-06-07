// ==UserScript==
// @name          		Thread Filter
// @namespace     	http://www.orkut.co.in/Main#Profile?uid=17477750861732923167 
// @author			Shubham 
// @description     	Deletes Threads whihc contain particular keywords like "FREE RECHARGE"
// @include      	 	http://*.orkut.*Comm*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var a = new Array("FREE MOBILE RECHARGE","FREE RECHARGE","BLUE FILM","Free Mobile RECHARGE");

for(i=0;i<a.length;i++){
	$("tr[class*=list]:contains('"+a[i]+"')").remove();
}