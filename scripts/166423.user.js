// ==UserScript==

// @name Think Positively
// @namespace Think Positively
// @description A positive message for Positive.
// @include http://hackforums.net/* 
// @include http://www.hackforums.net/* 
// @version 1.0 

// ==/UserScript== 

var regex = /\(Unread(.*?)\)/; 
var revised = "(Unread $1) | You're amazing, never forget that!"; 

document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
