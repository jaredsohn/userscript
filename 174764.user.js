// ==UserScript==
// @name          SF Header Links
// @namespace     xerotic/hflinks
// @description   Adds special links to the Swift Forums header.
// @include       http://swiftforums.net/*
// @include       http://www.swiftforums.net/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=70'>Buy</a> | <a href='forumdisplay.php?fid=69'>Sell</a> | <a href='myawards.php'>Awards</a> | <a href='usercp.php?action=usergroups'>Group Memberships</a> | <a href='forumdisplay.php?fid=7'>The Lounge</a> | <a href='newpoints.php?action=shop'>Quick Shop</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);