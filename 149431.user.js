// ==UserScript==
// @name        The Student Room Sides Remover
// @description Will fix where you don't want a big grey area on non-homepage pages. Latest version also makes the header and footer the same size.
// @author      Robert Humphries
// @include     http://www.thestudentroom.co.uk/*
// @include     http://thestudentroom.co.uk/*
// @exclude     http://*.thestudentroom.co.uk/
// @version     1.1
// ==/UserScript==

var stylesheet 	= document.createElement('style')
stylesheet.innerHTML = ".page-section {width: 98% !important;}";
document.body.appendChild(stylesheet);