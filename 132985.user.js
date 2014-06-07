// ==UserScript==
// @name          DrQuickmodz UserScript for Reverse
// @namespace     DrQuickmodz UserScript for Reverse
// @description   Adds HF News 
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.0
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=162'>HF News</a> ";document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);