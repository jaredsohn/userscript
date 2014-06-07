// ==UserScript==

// @name Coffee's infamous Links 
// @namespace infamous links 
// @description Adds infamous links to the header 
// @include http://hackforums.net/* 
// @include http://www.hackforums.net/* 
// @version 1.0 


// ==/UserScript== 

var regex = /\(Unread(.*?)\)/; 
var revised = "(Unread $1) | <a href=' forumdisplay.php?fid=230 '>Infamous subforum</a> | <a href=' showthread.php?tid=3239848 '>Infamous lounge</a> | <a href=' showthread.php?tid=3159440 '>Group contributions</a>"; 

document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);