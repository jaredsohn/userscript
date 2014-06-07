/*
Written by Joseph Delabruere
*/

// ==UserScript==
// @name          Password Show
// @namespace     
// @description   Converts Password Inputs to Non Password
// @version	0.1
// @date		2007-04-15
// @include       *
// ==/UserScript==
function convert() {
var fields=document.getElementsByTagName("input");
for(var i=0;i<fields.length;i++){
	if(fields[i].type.toLowerCase()=="password"){
		fields[i].type="text";
	}
}
}
convert()