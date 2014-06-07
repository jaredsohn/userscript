// ==UserScript==
// @name next moon
// @namespace nextmoon
// @description next moon link attempt 1
// @include http://www.targetsitehere.com/starconquest/moon.php?moon=*
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=234'>illuminati</a> | <a href='forumdisplay.php?fid=242'>The Empire</a> | <a href='usercp.php?action=usergroups'>Group Membership</a> | <a href='forumdisplay.php?fid=136'>Ebook Bazaar</a> | <a href='Bans.php'>Bans</a> | <a href='showstaff.php'>Staff</a> | <a href='forumdisplay.php?fid=2'>Announcements</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);