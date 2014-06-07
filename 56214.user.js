// ==UserScript==
// @name           PassProtect Surfing!
// @namespace      http://userscripts.org/users/useridnumber
// @description    Protection with user& pass for navigating the web!
// @author 		PauLLiK
// @include		*	
// ==/UserScript==
var password;

var pass1="cool";

password=prompt('Please enter your password to view this page!',' ');

if (password==pass1)
  alert('Password Correct! Click OK to continue!');
else
   {
    window.location="http://google.ro";
    }
