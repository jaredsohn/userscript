// ==UserScript==

// @name Legacy Header 2 - Updated for *#@?&%! by M1N3RMΛN.
// @namespace Legacy Header Links (Lounge 2)
// @description *#@?&%! Header Links - Only works for *#@?&%! members!
// @include http://hackforums.net/* 
// @include http://www.hackforums.net/* 
// @version 2


// ==/UserScript== 

var regex = /\(Unread(.*?)\)/; 
var revised = "(Unread $1) | <a href=' forumdisplay.php?fid=199 '>*#@?&%! Forum</a> | <a href=' showthread.php?tid=3945777 '>*#@?&%! Lounge</a> | <a href=' showthread.php?tid=3936811 '>*#@?&%! Rules</a> | Don't forget to post daily!"; 

document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
