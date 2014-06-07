// ==UserScript==
// @name           Facebook Auto Login
// @namespace      ~dkhal~
// @include        http://www.facebook.com/
// @include        https://www.facebook.com/
// @copyright dkhal
// ==/UserScript==
user="USERNAME"; // Your email address
pass="PASSWORD"; // Your password

document.getElementById('email').value=user;
document.getElementById('pass').value=pass;
document.getElementById('menubar_login').submit();