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
// @namespace     http://catalogue.fvrl.bc.ca/patroninfo
// @description   Auto login for the FVRL website
// @include       http://catalogue.fvrl.bc.ca/patroninfo*
// ==/UserScript==

var form = document.forms[0];
var user = document.forms[0].elements[0];
var input = document.forms[0].elements[1];
var pass = document.forms[0].elements[2];

user.value = "Jane Smith";           // Enter login name
input.value = "29000000000000";      // Enter FVRL number
pass.value = "12345";                // Enter your pin

//alert("You are automatically signing in!");  //uncomment this to get a precaution

form.submit();
