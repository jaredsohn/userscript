// ==UserScript==
// @name          DrQuickmodz UserScript for Starstruck
// @namespace     DrQuickmodz UserScript for Starstruck
// @description   Adds Respawn and GFX Requests 
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=200'>Respawn</a> | <a href='forumdisplay.php?fid=158'>Graphic Request</a>";document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);