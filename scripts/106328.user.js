/*

Original Fix Copyright (c) 2010, Alex Saunders
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html

*/
// ==UserScript==
// @name          Facepunch Logout Script
// @namespace     http://www.facepunch.com/*
// @description   Log out of FacePunch simply
// @include       http://facepunch.com/*
// @include       http://www.facepunch.com/*
// @include       http://*.facepunch.com/*
// @exclude       http://www.facepunch.com/login.php
// @exclude       http://www.facepunch.com/showpost.php?p=*
// @exclude       http://facepunch.com/login.php
// @exclude       http://facepunch.com/showpost.php?p=*
// ==/UserScript==


//logout
var allNav, thread, indicator, ogout;
allNav = document.getElementsByClassName('navbarlink');
nav = allNav[allNav.length - 1];
logoutText = '<a href="http://www.facepunch.com/login.php?do=logout"><img src="http://www.facepunch.com/fp/navbar/register.png" alt="Log Out"> Log Out</a>';
logout = document.createElement("div");
logout.setAttribute("class","navbarlink floatright");
logout.innerHTML = logoutText;
nav.parentNode.insertBefore(logout, nav.nextSibling);