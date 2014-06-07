// ==UserScript==
// @name          HF Links for McFlurry
// @namespace     Blades/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) ▲  <a href='forumdisplay.php?fid=2'>Rules and Announcments</a> ▲ <a href='forumdisplay.php?fid=110'>White Hat Help</a> ▲ <a href='forumdisplay.php?fid=159'>Mac OSX</a> ▲ <a href='forumdisplay.php?fid=119'>HJT Team</a> ▲ <a href='forumdisplay.php?fid=230'> ▲Infamous</a> ▲ <a href='managegroup.php?gid=44'>Infamous User CP</a> ▲";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);