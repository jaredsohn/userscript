// INGDirect Canada AutoLogin
// 2006-04-06
//
// --------------------------------------------------------------------//
// This is a Greasemonkey user script that automatically 
// signs you into the ING Direct Canada website.
// As it is a user-specific script, you must provide your 
// ClientNumber and PIN in "input.value" and "pass.value" field respectively.
// --------------------------------------------------------------------
// ==UserScript==
// @name          INGDirectAutoLogin
// @namespace     http://ingdirect.ca
// @description   Signs you automatically in ING Direct Canada website. You will need to edit this script to make it fully automated. By default, the script will NOT enter your PIN.
// @include       https://secure.ingdirect.ca/*
// ==/UserScript==

var form = document.forms.namedItem("Signin");
var input = form.elements.namedItem("ACN");
var pass = form.elements.namedItem("PIN");
input.value = "12345678";      // Enter your login name
//pass.value = "123456";     // Enter your password and uncomment this line

//alert("You are automatically signing in!");  //uncomment this to get a precaution

//form.submit();
