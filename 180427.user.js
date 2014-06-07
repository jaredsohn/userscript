// ==UserScript==
// @name        The Student Room Notifications Remover
// @description Will remove the notifications section
// @author      Robert Humphries
// @include     http://www.thestudentroom.co.uk/*
// @include     http://thestudentroom.co.uk/*
// @version     1.0
// ==/UserScript==

var stylesheet 	= document.createElement('style')
stylesheet.innerHTML = ".notifications  {display: none !important;}";
document.body.appendChild(stylesheet);