// ==UserScript==
// @name          DrQuickmodz UserScript
// @namespace     DrQuickmodz UserScript
// @description   Adds links for Dr.Quickmodz
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=230'>Propitious</a> | <a href='forumdisplay.php?fid=25'>Lounge</a>";document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);
