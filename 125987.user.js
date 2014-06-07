// ==UserScript==
// @name    xerotic's HF Special Links
// @namespace  xerotic/hflinks
// @description   Adds special links to the HackForums header.
// @include  http://hackforums.net/*
// @include  http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=63'>RAT's Crew</a> | <a href='bans.php'>Bans</a> | <a href='negreplog.php'>Neg Rep Log</a> | <a href='forumdisplay.php?fid=202'>Marketers Sub-forum</a> | <a href='/forumdisplay.php?fid=105'>MarketPlace</a> | <a href='forumdisplay.php?fid=107'>Premium Sellers Section</a> | <a href='forumdisplay.php?fid=163'>MarketPlace Discussions</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);