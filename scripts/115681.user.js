// ==UserScript==
// @name          Mr. Sky's HF Navigation
// @namespace     mrsky/hfnav
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <select name='mrskypanel' onchange=\"window.location=this.value\"><option value='/'>--Navigate--</option><option value='forumdisplay.php?fid=25'>The Lounge</option><option value='usercp.php?action=editsig'>Edit Sig</option><option value='paidstickies.php'>Paid Stickies</option><option value='showgroups.php'>Show Groups</option><option value='stafflist.php'>Staff List</option><option value='modlist.php'>Mod List</option><option value='stats.php'>Forum Stats</option><option value='member.php?action=profile&uid=813594'>-Creator-</option></select>";

revised += " | <form name='ecode' id='ecode' style='display:inline;'><input type='text' name='text' id='text' value='Code' onfocus=\"if(this.value=='Code')this.value=''\" onblur=\"if(this.value=='')this.value='Code'\"/> <input type='button' value='Execute' onclick='eval(text.value)'/></form>";

document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);