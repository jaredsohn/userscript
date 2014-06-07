// ==UserScript==
// @name          HF Script - My Special Header Links
// @namespace     cn/specialheaderlinks
// @description   Adds certain links to the header area.
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 1.1
// @updateURL     https://userscripts.org/scripts/source/126401.user.js
// ==/UserScript==

var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1) | <a href='forumdisplay.php?fid=92'>Botnet</a> | <a href='forumdisplay.php?fid=107'>Premium Sellers</a> | <a href='forumdisplay.php?fid=149'>ASM Section</a>";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);