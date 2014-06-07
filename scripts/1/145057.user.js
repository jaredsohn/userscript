// ==UserScript==
// @name          Sigma's HF Special Links Created by Cryptic 
// @namespace     Cryptic's Special Links for Sigma
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=230'>Infamous</a> | <a href=forumdisplay.php?fid=234'>Illuminati</a> | <a href='forumdisplay.php?fid=236'>Logic</a> | <a href='showgroups.php'>Show Groups</a> | <a href='bans.php'>Bans</a> | <a href='forumdisplay.php?fid=195 '>Gamer Tags</a> | <a href='forumdisplay.php?fid=162'>News</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
