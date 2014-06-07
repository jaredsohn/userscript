// ==UserScript==
// @name          Illuminati HF Special Links 
// @namespace     IlluminatiSpecialLinks
// @description   Adds special links to the HackForums header custom for Illuminati group members.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='http://www.hackforums.net/forumdisplay.php?fid=234'>Illuminati</a> | <a href='bans.php'>Bans</a> | <a href='forumdisplay.php?fid=107'>Premium Sellers Section</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='forumdisplay.php?fid=2'>Announcements</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);