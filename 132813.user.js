// ==UserScript==
// @name          DrQuickmodz UserScript for Blades
// @namespace     DrQuickmodz UserScript for Blades
// @description   Adds links for Blades- Propitious and TechSperts
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=230'>Propitious</a> | <a href='forumdisplay.php?fid=124'>Techsperts</a>";document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);