// ==UserScript==

// @name Legion Header Changes 1.0
// @namespace Legion Header Links
// @description Legion Header links v1.3.0 - This script is only useful to Legion Members.
// @include http://hackforums.net/* 
// @include http://www.hackforums.net/* 
// @version 1.0 


// ==/UserScript== 

var regex = /\(Unread(.*?)\)/; 
var revised = "(Unread $1) | <a href=' forumdisplay.php?fid=124 '>Legion Forum</a> | <a href=' showthread.php?tid=3613275 '>Legion Lounge</a> | <a href=' showthread.php?tid=3436700 '>Rules & Policies</a> | We are Legion!"; 

document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);