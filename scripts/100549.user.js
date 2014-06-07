// FVRL Auto Login
// 2006-04-06
//
// --------------------------------------------------------------------//
// This is a Greasemonkey user script that automatically 
// signs you into the FVRL website.
// As it is a user-specific script, you must provide your 
// Username, Library Number and PIN in "user.value", "input.value" and "pass.value" field respectively.
// --------------------------------------------------------------------
// ==UserScript==
// @name          FVRLAutoLogin
// @namespace     http://www.kaskus.us/
// @description   Auto login for the FVRL website
// @include       http://www.kaskus.us/*

// ==/UserScript== 

var form = document.forms[0];
var user = document.forms[0].elements[0];
var input = document.forms[0].elements[1];
 


user.value = "wow_kk_wow";           
  input.value =      "123456" ;
 
 	
	
	

//alert("You are automatically signing in!");  //uncomment this to get a precaution
form.submit();
 