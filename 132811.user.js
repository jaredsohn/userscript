// ==UserScript==
// @name          DrQuickmodz UserScript for Propitious
// @namespace     DrQuickmodz UserScript for Propitious
// @description   Adds links for Propitious
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=230'>Propitious</a>";document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);