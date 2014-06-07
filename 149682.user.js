// ==UserScript==
// @name        630
// @namespace     
// @description   Special Header Links For 630
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=242'>The Empire</a> | <a href='stats.php'>Stats</a> | <a href='bans.php'>Bans</a> | <a href='myawards.php'>Awards</a> | <a href='member.php?action=profile&uid=1'>Omniscient</a> | <a href='forumdisplay.php?fid=234'>Illuminati</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);