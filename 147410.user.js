// ==UserScript==
// @name        Phytrix  
// @namespace     
// @description   Special Header Links For Phytrix
// @include      *hackforums.net*
// @version 1.0
// ==/UserScript==


var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=124'>Rhythm</a> | <a href='forumdisplay.php?fid=236'>Logic</a> | <a href='forumdisplay.php?fid=210'>Writ3rs</a> | <a href='forumdisplay.php?fid=242'>The Empire</a> | <a href='bans.php'>Bans</a> | <a href='forumdisplay.php?fid=162'>HF News</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);