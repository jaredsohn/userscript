// ==UserScript==
// @name          Thomas Special links
// @namespace     Thomas
// @description   Adds links to the RetroNet header.
// @include      *forum.retronet.nl*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='managegroup.php?gid=22'>Group Management</a> |  <a href='forum-161.html'>143</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);