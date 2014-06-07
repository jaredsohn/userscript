// TwitterAutoLogin by Steve Tran (clu3.com)
// 2010-07-12
// 
// --------------------------------------------------------------------//
// This is a Greasemonkey user script that automatically 
// signs you while loading of mail.yahoo.com page.
// As it is a user-specific script, you must provide your 
// username and password in "input.value" and "pass.value" field respectively.
// --------------------------------------------------------------------
// ==UserScript==
// @name          TwitterAutoLogin
// @namespace     http://clu3.com/twitterlogin
// @description   Signs you automatically in twitter
// @include       http://twitter.com/login
// ==/UserScript==

var input = document.getElementById("username_or_email");
var pass = document.getElementById("password");
input.value = "xxx";      // Enter your login name
pass.value = "xxx";     // Enter your password
var evt = document.createEvent('MouseEvents'); 
evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null); 
var el = document.getElementById('signin_submit');  
el.dispatchEvent(evt);
