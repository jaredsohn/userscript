// ==UserScript==
// @name          Illuminati HF Special Links 
// @namespace     IlluminatiSpecialLinks
// @description   Adds special links to the HackForums header custom for Illuminati group members.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='http://www.hackforums.net/forumdisplay.php?fid=234'>Illuminati</a> | <a href='forumdisplay.php?fid=107'>Premium Sellers Section</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showthread.php?tid=1161395'>Frost Stresser</a> | <a href='postactivity.php'>Activity</a> | <a href='negreplog.php'>Negrep Log</a> | <a href='bans.php'>Bans</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);