// ==UserScript==

// @name Defket's script
// @namespace Defket header links
// @description For defket
// @include http://hackforums.net/* 
// @include http://www.hackforums.net/* 
// @version 1.0 


// ==/UserScript== 

var regex = /\(Unread(.*?)\)/; 
var revised = "(Unread $1) | <a href=' forumdisplay.php?fid=25 '>The lounge</a> | <a href=' forumdisplay.php?fid=162 '>HF News</a> | <a href=' forumdisplay.php?fid=69 '>GFX tutorials</a> | "; 

document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
