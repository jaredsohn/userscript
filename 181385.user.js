// ==UserScript==
// @name          Kleoz - Staff Junk
// @namespace     Reliance/Kleoz
// @description   Makes it easier for staff to junk a thread
// @include       http://kleoz.net/*
// @include       http://kleoz.net/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='paidstickies.php'>Paid Stickies</a> | <a href='showgroups.php'>Show Groups</a> | <a href='showstaff.php'>Staff List</a> | <a href='showmods.php'>Mod List</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);

junk = '<form action="moderation.php" method="post"><input type="hidden" name="tid" value="'+tids[c]+'" /><input type="hidden" name="action" value="'+imgx[c]+'" /><input type="hidden" name="my_post_key" value="'+mypostkey+'" />&nbsp;<input type="submit" class="bitButton" style="margin-top:-15px;" value="'+status+'"  /></form><form action="moderation.php" method="post" onsubmit="return confirm(\'Are you sure? Really really sure?\');"><input type="hidden" name="tid" value="'+tids[c]+'" /><input type="hidden" name="action" value="ub3rjunk" /><input type="hidden" name="my_post_key" value="'+mypostkey+'" /><input type="submit" class="bitButton" value="Junk" /></form>';
				e.innerHTML = junk;
				c = c + 1;