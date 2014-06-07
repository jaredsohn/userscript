// ==UserScript==
// @name          HF Script - Vibrate Special Links
// @namespace     vibrate/vibratespeciallinks
// @description   Adds special links to the HackForums header.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.1
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='http://www.hackforums.net/forumdisplay.php?fid=235'>Valor</a> | <a href='bans.php'>Bans</a> | <a href='negreplog.php'>Neg Rep Log</a> | <a href='http://www.hackforums.net/forumdisplay.php?fid=107'>Premium Sellers Section</a> | <a href='http://www.hackforums.net/forumdisplay.php?fid=174'>Ub3r Giveaways</a> | <a href='http://www.hackforums.net/reputation.php?uid=965198'>Reputation<\a> |";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);