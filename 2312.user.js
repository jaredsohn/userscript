// YMailAutoLogin
// 2005-12-09
//
// --------------------------------------------------------------------//
// This is a Greasemonkey user script that automatically 
// signs you while loading of mail.yahoo.com page.
// As it is a user-specific script, you must provide your 
// username and password in "input.value" and "pass.value" field respectively.
// --------------------------------------------------------------------
// ==UserScript==
// @name          YMailAutoLogin
// @namespace     http://groups.yahoo.com/gruop/ccc17
// @description   Signs you automatically in Y! mail
// @include       http://mail.yahoo.com
// ==/UserScript==

var form = document.forms.namedItem("login_form");
var input = form.elements.namedItem("login");
var pass = form.elements.namedItem("passwd");
input.value = "user_name";      // Enter your login name
pass.value = "user_password";     // Enter your password

//alert("You are automatically signing in!");  //uncomment this to get a precaution

form.submit();

