// ==UserScript==
// @name           Geeklog left tab remover
// @namespace      
// @description    Removes the left tab on sites using geeklog and center the content to fixed width of 900px. Useful for viewing forums etc. You have to add sites you want to use this on by hand.
// @include        http://uskojarukous.net/phpBB2/*
// ==/UserScript==

var elements = document.getElementsByClassName("block-featured-left");
elements[0].style.display = "none"; 

var headeri = document.getElementsByClassName("header-envelope");
headeri[0].style.width = "900px";