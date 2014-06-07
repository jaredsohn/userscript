// ==UserScript==
// @name          McFlurry's HF Special Links
// @namespace     McFlurry/hflinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='bans.php'>Bans</a> | <a href='negreplog.php'>Neg Rep Log</a> | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showgroups.php'>Show Groups</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a> | <a href='forumdisplay.php?fid=200'>Reverence</a/> | <a href='showthread.php?tid=1807934'>Project Revive</a> | <a href='showthread.php?tid=1806302'>Helpful Post</a> | <a href='forumdisplay.php?fid=58'>Alliance</a> | <a href='showthread.php?tid=1875451'>TAFWA</a> | <a href='member.php?action=profile&uid=725160'>Profile</a> | <a href='forumdisplay.php?fid=119'>HJT</a> | <a href='showthread.php?tid=93500'>HJT Tutorial</a> <a href='managegroup.php?gid=21'>Group CP</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);