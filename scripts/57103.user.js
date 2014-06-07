// ==UserScript==
// @name           FB Test
// @namespace      
// @include        http://www.facebook.com/*
// @copyright      Cyber38
// ==/UserScript==

user=""; // Your email address
pass=""; // Your password

document.getElementById('email').value=user;
document.getElementById('pass').value=pass;
document.forms[0].elements.namedItem('email').focus();