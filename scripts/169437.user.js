// ==UserScript==

// @name Innovation Header Changes 1.0
// @namespace Innovation Header Links
// @description Innovation Header links v1.3.0 - This script is only useful to Innovation Members.
// @include http://hackforums.net/* 
// @include http://www.hackforums.net/* 
// @version 1.0 


// ==/UserScript== 

var regex = /\(Unread(.*?)\)/; 
var revised = "(Unread $1) | <a href=' forumdisplay.php?fid=200 '>Innovation Forum</a> | <a href=' showthread.php?tid=3434199 '>Innovation Lounge</a> | <a href=' showthread.php?tid=3448554 '>Handbook</a> | Don't forget your 2 daily posts."; 

document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);