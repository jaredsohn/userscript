// ==UserScript==
// @name        Random email
// @namespace   http://xyz
// @include     http://www.photoxia.com/fb2/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1
// ==/UserScript==
function makeEmail() { 
var strValues="abcdefghijklmnopqrstuvwxyz1234567890"; 
var strEmail = ""; 
var strTmp; 
for (var i=0;i<10;i++) { 
strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
strEmail = strEmail + strTmp; 
} 
strTmp = ""; 
strEmail = strEmail + "@"; 
//for (var j=0;j<8;j++) { 
//strTmp = strValues.charAt(Math.round(strValues.length*Math.random())); 
//strEmail = strEmail + strTmp; 
//} 
strEmail = strEmail + "gmail.com" 
return strEmail; 
} 

$(function(){
	//alert("loaded");

    if(document.location=="http://www.photoxia.com/fb2/wp-content/plugins/wp-photocontest/viewimg.php?post_id=15&img_id=3005"){
		$("#voter_email").val(makeEmail());
		
	}
});