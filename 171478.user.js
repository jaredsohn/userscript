// ==UserScript==
// @name        Nu Pageheader Deleter
// @namespace   CookieFoetsie
// @include     http://nu*.nl/*
// @include     http://www.nu*.nl/*
// @version     1.1
// @description Removes useless pageheader from top of screen
// ==/UserScript==

// remove pageheaders
var HeaderFoetsie = document.getElementById('pageheader');
HeaderFoetsie.parentElement.removeChild(HeaderFoetsie);

var WebringFoetsie = document.getElementById('webring');
WebringFoetsie.parentElement.removeChild(WebringFoetsie);