// ==UserScript==
// @name        Moto Phone Portal Enhanced
// @version     0.1.2
// @description Add functionality to Moto Phone Portal
// @include     http*
// ==/UserScript==

$(document).ready(function(){
console.log('here');
	setInterval("getStatus(0)", 5000);
});
