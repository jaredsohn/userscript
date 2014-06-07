// ==UserScript==
// @name        KU autologin
// @namespace   http://userscripts.org/users/484511
// @include     https://intranet.ku.dk/*
// @exclude     https://intranet.ku.dk/Sider/
// @version     1
// ==/UserScript==

// Insert your username and password here
user = "";
pass = "";


document.getElementById("username").value = user;
document.getElementById("password").value = pass;

document.forms["logonForm"].submit();
