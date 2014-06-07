// ==UserScript==
// @name          password for website
// @author	  Tarek Sanyoura
// @version	  1.01
// @date	  23/5/2009
// @description   Ask for password before entering specific websites
// @namespace	  http://userscripts.org/scripts/show/49965
// @include       http://www.facebook.com/*
// @copyright     Tarek Sanyoura
// ==/UserScript==


var password;

var pass1="admin";

password=prompt('Please enter your password to view this page!','Write your password');

if (password==pass1)
  alert('Password Correct! Click OK to Enter!');
else
   {
    window.location="about:blank";
    }