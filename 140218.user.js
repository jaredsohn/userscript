// ==UserScript==
// @name          xerotic's HF Special Links - L33t
// @namespace     xerotic/hflinksl33t
// @description   Adds special links to the HackForums header for L33t members.
// @include       http://wweforums.net/*
// @include       http://www.wweforums.net/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='modcp.php?action=ipsearch'>IP Search</a> | <a href='fishsticks/index.php?module=user-awards'>Give Awards</a> | <a href='usercp.php?action=drafts'>Drafts</a> | <a href='memberlist.php?action=search'>New Member Search</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);