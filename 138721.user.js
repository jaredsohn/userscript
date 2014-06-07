// ==UserScript==
// @name        Grepolis Auto Login to World Selection
// @include     http://*.grepolis.*
// @version     0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @icon        http://s7.directupload.net/images/120320/ullq32vn.jpg
// ==/UserScript==


// ----------------------------------------------------------------------------
// Accountinfo
// ----------------------------------------------------------------------------
var username = "username"
var password = "password"


// ----------------------------------------------------------------------------
// Login Script
// ----------------------------------------------------------------------------
document.getElementById('name').value = username
document.getElementById('password').value = password
$("a.button").click();