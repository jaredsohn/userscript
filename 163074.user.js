// ==UserScript==

// @name Respawn Header 1.3.0
// @namespace Respawn Header Links
// @description Respawn Header links v1.3.0 - This script is only useful to Respawn Members.
// @include http://hackforums.net/* 
// @include http://www.hackforums.net/* 
// @version 1.3.0 


// ==/UserScript== 

var regex = /\(Unread(.*?)\)/; 
var revised = "(Unread $1) | <a href=' forumdisplay.php?fid=200 '>Respawn Forum</a> | <a href=' showthread.php?tid=3313851 '>Respawn Lounge</a> | <a href=' showthread.php?tid=3368476 '>Gaming Lounge</a> | Don't forget your 2 daily posts."; 

document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);