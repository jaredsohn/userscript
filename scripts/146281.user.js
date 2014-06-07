// ==UserScript==
// @name          Strokes' Custom Header Links For Analog
// @namespace     
// @description   Custom Header Links For Analog
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='usercp.php?action=editlists '>Buddy List</a> | <a href='forumdisplay.php?fid=58'>The Alliance</a> | <a href='forumdisplay.php?fid=62 '>Reviewers</a> | <a href='forumdisplay.php?fid=230'>Infamous</a> | <a href='forumdisplay.php?fid=236'>Logic</a> | <a href='showgroups.php'>Groups</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);