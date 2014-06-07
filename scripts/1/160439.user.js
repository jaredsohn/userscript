// ==UserScript==
// @name          Links for Eternal
// @namespace     Eternal/Connected
// @include      *hackforums.net*
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=124'>Legion</a> | <a href='forumdisplay.php?fid=250'>143</a> | <a href='forumdisplay.php?fid=242'>Empire</a> | <a href='forumdisplay.php?fid=173'>Requests</a> | <a href='forumdisplay.php?fid=45'>Hacking</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);