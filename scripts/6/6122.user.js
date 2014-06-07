// ==UserScript==
// @name        Newsvine Remove alsoVote
// @version     1.0
// @author      Lukas Fragodt
// @namespace   lukas.fragodt.newsvine 
// @description Removes the new "& Vote" comment submit buttons.
// @include     http://newsvine.com/_news/*
// @include     http://*.newsvine.com/_news/*
// ==/UserScript==

//Changes style of alsoVote to hide all instances of the alsoVote button.
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');

style.innerHTML = '#alsoVote { display:none }';
head.appendChild( style );
