// Zofim Fourm, fix script
// version 1
// 9.4.2007
// Copyright, Omer Kahani
// Released under the GPL licens

// ==UserScript==
// @name	Zofim Fourm
// @description	The script fix problem in the URL in the forum pages.	
// @include	http://www.zofim.org.il/forums/*
//==/UserScript==

function change_strings(id) {
var temp,temp_index,temp1
temp=window.document.getElementById(id).toString(); //get the URL and turns it to a string
temp_index=temp.indexOf('='); 
temp=temp.substring(temp_index+1); // Split from the '='+1 (the first number) to the end
temp=temp.substring(0,temp.length/2); // Split the number in the middle
temp1=window.document.getElementById(id).toString().substring(0,temp_index+1); // split the number from the URL
return(temp1+temp) // The clear URL + The coorect number
}

function change_urls() {
document.getElementById('oBCTroop').href=change_strings('oBCTroop');
document.getElementById('oBCForums').href=change_strings('oBCForums');
}

window.addEventListener("load", function() { change_urls() }, false);

//.user.js

