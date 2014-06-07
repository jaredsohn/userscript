// ==UserScript==

// @name Legacy Header 1.0
// @namespace Legacy Header Links
// @description Legacy Header Links - Only works for Legacy members!
// @include http://hackforums.net/* 
// @include http://www.hackforums.net/* 
// @version 1.0 


// ==/UserScript== 

var regex = /\(Unread(.*?)\)/; 
var revised = "(Unread $1) | <a href=' forumdisplay.php?fid=199 '>Legacy Forum</a> | <a href=' showthread.php?tid=3476363 '>Legacy Lounge</a> | <a href=' showthread.php?tid=3451161 '>Legacy Rules</a> | Don't forget to post daily!"; 

document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);